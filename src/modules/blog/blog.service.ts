import { CreateBlogDto } from '@modules/blog/dto/create-blog.dto';
import { BlogFindAllDto } from '@modules/blog/dto/find-all.dto';
import { UpdateBlogDto } from '@modules/blog/dto/update-blog.dto';
import { Blog } from '@modules/blog/entities/blog.entity';
import { CategoryService } from '@modules/category/category.service';
import { TagService } from '@modules/tag/tag.service';
import { UserAuth } from '@modules/user/user.controller';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Like, Repository } from 'typeorm';

import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from '@/common';

@Injectable()
export class BlogService
    implements
        CrudInterface<
            Blog,
            CreateBlogDto,
            UpdateBlogDto,
            BlogFindAllDto,
            PaginationData<Blog>,
            APIResponseData<Blog>,
            UserAuth
        >
{
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService,
        private readonly userService: UserService,
    ) {}

    findOneBySlug(id: string, currentUser: UserAuth) {
        throw new Error('Method not implemented.');
    }

    async findOneEntity(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        return await this.blogRepository.findOne({
            where: { id: id },
            ...options,
            withDeleted: withDeleted,
        });
    }

    async findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        const blog = await this.findOneOrFail(id);

        return {
            message: 'Lấy blog thành công',
            status: HttpStatus.FOUND,
            data: blog,
        };
    }

    async findAllEntity(findAllDto: BlogFindAllDto, withDeleted?: boolean): Promise<PaginationData<Blog>> {
        const { limit, page, search, sort, sortField } = findAllDto;

        const [data, count] = await this.blogRepository.findAndCount({
            where: search
                ? [
                      {
                          title: Like(`%${search}%`),
                      },
                      {
                          slug: Like(`%${search}%`),
                      },
                      {
                          description: Like(`%${search}%`),
                      },
                  ]
                : {},
            select: {
                id: true,
                slug: true,
                description: true,
                createDate: true,
                deleteDate: true,
                updateDate: true,
                user: {
                    name: true,
                    id: true,
                },
                category: {
                    id: true,
                    name: true,
                    slug: true,
                },
                tags: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            order: {
                [sortField]: sort,
            },
            relations: {
                category: true,
                tags: true,
                user: true,
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        return {
            items: data,
            total: count,
            limit: limit,
            page: page,
            totalPages: Math.ceil(count / limit),
            nextPage: page * limit < count ? page + 1 : undefined,
            prevPage: page > 1 ? page - 1 : undefined,
        };
    }

    async findAll(findAllDto: BlogFindAllDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        return {
            message: 'Lấy danh sách blog thành công',
            status: HttpStatus.OK,
            ...(await this.findAllEntity(findAllDto)),
        };
    }

    async checkExitsBySlug(slug: string): Promise<boolean> {
        return await this.blogRepository.exists({
            where: {
                slug: slug,
            },
            withDeleted: true,
        });
    }

    async createEntity(createDto: CreateBlogDto): Promise<Blog> {
        const { avatar, categoryId, content, description, status, tags, title, userId } = createDto;
        const slug = slugify(title, { lower: true });

        if (await this.checkExitsBySlug(slug)) {
            throw new ConflictException(`Slug ${slug} đã tồn tại`);
        }

        const category = await this.categoryService.findOneOrFail(categoryId);
        const user = await this.userService.findOneOrFail(userId);
        const tagEntities = await this.tagService.findOrCreate({ tags: tags });

        const blog = new Blog();

        blog.avatar = avatar;
        blog.category = category;
        blog.content = content;
        blog.description = description;
        blog.slug = slug;
        blog.status = status;
        blog.tags = tagEntities;
        blog.title = title;
        blog.user = user;

        return await this.blogRepository.save(blog);
    }

    async create(createDto: CreateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        return {
            message: 'Tạo mới blog thành công',
            status: 201,
            data: await this.createEntity(createDto),
        };
    }

    async updateEntity(id: string, updateDto: UpdateBlogDto): Promise<Blog> {
        const { avatar, categoryId, content, description, status, tags, title, userId } = updateDto;
        const blog = await this.findOneOrFail(id);

        if (title) {
            const slug = slugify(title, { lower: true });

            if ((await this.checkExitsBySlug(slug)) && slug !== blog.slug) {
                throw new ConflictException(`Slug ${slug} đã tồn tại`);
            }

            blog.slug = slug;
            blog.title = title;
        }

        if (userId && userId !== blog.user.id) {
            blog.user = await this.userService.findOneOrFail(userId);
        }

        if (categoryId && categoryId !== blog.category.id) {
            blog.category = await this.categoryService.findOneOrFail(categoryId);
        }

        if (tags) {
            blog.tags = await this.tagService.findOrCreate({ tags: tags });
        }

        blog.avatar = avatar || blog.avatar;
        blog.content = content || blog.content;
        blog.description = description || blog.description;
        blog.status = status || blog.status;

        return await this.blogRepository.save(blog);
    }

    async update(id: string, updateDto: UpdateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        return {
            message: 'Cập nhật blog thành công',
            status: HttpStatus.OK,
            data: await this.updateEntity(id, updateDto),
        };
    }

    async deleteEntity(id: string): Promise<Blog> {
        const blog = await this.findOneOrFail(id, {}, true);

        if (!blog.deleteDate) {
            throw new BadRequestException('Blog này chưa xoá mềm nên không thể xoá vĩnh viễn');
        }

        await this.blogRepository.delete(id);

        return blog;
    }

    async delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        const blog = await this.deleteEntity(id);

        return {
            message: 'Xoá blog thành công',
            status: HttpStatus.OK,
            data: blog,
        };
    }

    async restoreEntity(id: string): Promise<Blog> {
        const blog = await this.findOneOrFail(id, {}, true);

        if (!blog.deleteDate) {
            throw new BadRequestException('Blog này chưa bị xoá mềm nên không thể khôi phục');
        }

        await this.blogRepository.restore(id);

        return blog;
    }

    async restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        const blog = await this.restoreEntity(id);

        return {
            message: 'Khôi phục blog thành công',
            status: HttpStatus.OK,
            data: blog,
        };
    }

    async softDeleteEntity(id: string): Promise<Blog> {
        const blog = await this.findOneOrFail(id);

        if (!blog.deleteDate) {
            throw new BadRequestException('Blog này đã xoá mềm rồi');
        }

        await this.blogRepository.softDelete(id);

        return blog;
    }

    async softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        const blog = await this.softDeleteEntity(id);

        return {
            message: 'Xoá mềm blog thành công',
            status: HttpStatus.OK,
            data: blog,
        };
    }

    async findOneOrFail(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        const blog = await this.findOneEntity(id, options, withDeleted);

        if (!blog) {
            throw new NotFoundException('Blog không tồn tại');
        }

        return blog;
    }
}
