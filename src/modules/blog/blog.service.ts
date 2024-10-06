import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from '../../common';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { UserAuth } from '../user/user.controller';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

export interface FindAllDtoBlog {}

@Injectable()
export class BlogService
    implements
        CrudInterface<
            Blog,
            CreateBlogDto,
            UpdateBlogDto,
            FindAllDtoBlog,
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
    ) {}

    findOneBySlug(id: string, currentUser: UserAuth) {
        throw new Error('Method not implemented.');
    }

    async findOneEntity(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async findAllEntity(findAllDto: FindAllDtoBlog, withDeleted?: boolean): Promise<PaginationData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async findAll(findAllDto: FindAllDtoBlog, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async createEntity(createDto: CreateBlogDto): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async create(createDto: CreateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async updateEntity(id: string, updateDto: UpdateBlogDto): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async update(id: string, updateDto: UpdateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async deleteEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async restoreEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async softDeleteEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    async softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    async findOneOrFail(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        throw new Error('Method not implemented.');
    }
}
