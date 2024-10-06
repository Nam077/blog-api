import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Like, Repository } from 'typeorm';

import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from '../../common';
import { UserAuth } from '../user/user.controller';
import { CategoryFindAllDto } from './dto/blog-find-all.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService
    implements
        CrudInterface<
            Category,
            CreateCategoryDto,
            UpdateCategoryDto,
            CategoryFindAllDto,
            PaginationData<Category>,
            APIResponseData<Category>,
            UserAuth
        >
{
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findOneEntity(id: string, options?: FindOneOptionCustom<Category>, withDeleted?: boolean): Promise<Category> {
        return await this.categoryRepository.findOne({
            where: { id: id },
            ...options,
            withDeleted: withDeleted,
        });
    }

    async findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const category = await this.findOneOrFail(id);

        return {
            message: 'Lấy category thành công',
            status: HttpStatus.FOUND,
            data: category,
        };
    }

    async findOneBySlug(slug: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const category = await this.categoryRepository.findOne({
            where: { slug: slug },
            withDeleted: false,
        });

        return {
            message: 'Lấy category thành công',
            status: HttpStatus.FOUND,
            data: category,
        };
    }

    async findAllEntity(findAllDto: CategoryFindAllDto, withDeleted?: boolean): Promise<PaginationData<Category>> {
        const { limit, page, search, sort, sortField } = findAllDto;

        const [data, count] = await this.categoryRepository.findAndCount({
            where: search
                ? [
                      {
                          name: Like(`%${search}%`),
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
                name: true,
                slug: true,
                description: true,
                createDate: true,
                deleteDate: true,
                updateDate: true,
            },
            order: {
                [sortField]: sort,
            },
            relations: {},
            take: limit,
            skip: (page - 1) * limit,
        });

        return {
            items: data,
            total: count,
            limit: findAllDto.limit,
            page: findAllDto.page,
            totalPages: Math.ceil(count / findAllDto.limit),
            nextPage: page * limit < count ? findAllDto.page + 1 : undefined,
            prevPage: page > 1 ? findAllDto.page - 1 : undefined,
        };
    }

    async findAll(findAllDto: CategoryFindAllDto, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const categories = await this.findAllEntity(findAllDto);

        return {
            message: 'Lấy danh sách category thành công',
            status: HttpStatus.FOUND,
            ...categories,
        };
    }

    async checkExitsBySlug(slug: string): Promise<boolean> {
        return await this.categoryRepository.exists({
            where: { slug: slug },
            withDeleted: true,
        });
    }

    async createEntity(createDto: CreateCategoryDto): Promise<Category> {
        const { name, description } = createDto;
        const slug = slugify(name, { lower: true });

        if (await this.checkExitsBySlug(slug)) {
            throw new ConflictException(`Slug ${slug} đã tồn tại`);
        }

        const category = new Category();

        category.name = name;
        category.slug = slug;
        category.description = description;

        return await this.categoryRepository.save(category);
    }

    async create(createDto: CreateCategoryDto, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        return {
            message: 'Tạo mới category thành công',
            status: HttpStatus.CREATED,
            data: await this.createEntity(createDto),
        };
    }

    async updateEntity(id: string, updateDto: UpdateCategoryDto): Promise<Category> {
        const { name, description } = updateDto;
        const category = await this.findOneOrFail(id);
        let slug = category.slug;

        if (name) {
            slug = slugify(name, { lower: true });

            if (category.slug !== slug && (await this.checkExitsBySlug(slug))) {
                throw new ConflictException(`Slug ${slug} đã tồn tại`);
            }

            category.name = name;
            category.slug = slug;
        }

        if (description) {
            category.description = description;
        }

        return await this.categoryRepository.save(category);
    }

    async update(id: string, updateDto: UpdateCategoryDto, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        return {
            message: 'Cập nhật category thành công',
            status: HttpStatus.OK,
            data: await this.updateEntity(id, updateDto),
        };
    }

    async deleteEntity(id: string): Promise<Category> {
        const category = await this.findOneOrFail(id);

        if (!category.deleteDate) {
            throw new BadRequestException(`Category chưa bị xoá`);
        }

        await this.categoryRepository.delete(id);

        return category;
    }

    async delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const category = await this.deleteEntity(id);

        return {
            message: 'Xoá category thành công',
            status: HttpStatus.OK,
            data: category,
        };
    }

    async restoreEntity(id: string): Promise<Category> {
        const category = await this.findOneOrFail(id, {}, true);

        if (!category.deleteDate) {
            throw new BadRequestException(`Category chưa bị xoá`);
        }

        await this.categoryRepository.restore(id);

        return category;
    }

    async restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const category = await this.restoreEntity(id);

        return {
            message: 'Khôi phục category thành công',
            status: HttpStatus.OK,
            data: category,
        };
    }

    async softDeleteEntity(id: string): Promise<Category> {
        const category = await this.findOneOrFail(id, {
            relations: { blogs: true },
        });

        if (category.deleteDate) {
            throw new BadRequestException(`Category đã bị xoá`);
        }

        if (category.blogs && category.blogs.length > 0) {
            throw new BadRequestException(`Category đang chứa blog`);
        }

        await this.categoryRepository.softDelete(id);

        return category;
    }

    async softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        const category = await this.deleteEntity(id);

        return {
            message: 'Xoá category thành công',
            status: HttpStatus.OK,
            data: category,
        };
    }

    async findOneOrFail(id: string, options?: FindOneOptionCustom<Category>, withDeleted?: boolean): Promise<Category> {
        const category: Category = await this.findOneEntity(id, options, withDeleted);

        if (!category) {
            throw new NotFoundException(`Category không tồn tại`);
        }

        return category;
    }
}
