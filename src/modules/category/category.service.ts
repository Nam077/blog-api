import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';

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

    findOneEntity(id: string, options?: FindOneOptionCustom<Category>, withDeleted?: boolean): Promise<Category> {
        throw new Error('Method not implemented.');
    }

    findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
    }

    findAllEntity(findAllDto: CategoryFindAllDto, withDeleted?: boolean): Promise<PaginationData<Category>> {
        throw new Error('Method not implemented.');
    }

    findAll(findAllDto: CategoryFindAllDto, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
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

    updateEntity(id: string, updateDto: UpdateCategoryDto): Promise<Category> {
        throw new Error('Method not implemented.');
    }

    update(id: string, updateDto: UpdateCategoryDto, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
    }

    deleteEntity(id: string): Promise<Category> {
        throw new Error('Method not implemented.');
    }

    delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
    }

    restoreEntity(id: string): Promise<Category> {
        throw new Error('Method not implemented.');
    }

    restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
    }

    softDeleteEntity(id: string): Promise<Category> {
        throw new Error('Method not implemented.');
    }

    softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Category>> {
        throw new Error('Method not implemented.');
    }

    findOneOrFail(id: string, options?: FindOneOptionCustom<Category>, withDeleted?: boolean): Promise<Category> {
        throw new Error('Method not implemented.');
    }
}
