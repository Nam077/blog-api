import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from 'src/common/interfaces';
import { Repository } from 'typeorm';

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
    ) {}

    findOneEntity(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    findAllEntity(findAllDto: FindAllDtoBlog, withDeleted?: boolean): Promise<PaginationData<Blog>> {
        throw new Error('Method not implemented.');
    }

    findAll(findAllDto: FindAllDtoBlog, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    createEntity(createDto: CreateBlogDto): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    create(createDto: CreateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    updateEntity(id: string, updateDto: UpdateBlogDto): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    update(id: string, updateDto: UpdateBlogDto, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    deleteEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    restoreEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    softDeleteEntity(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }

    softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Blog>> {
        throw new Error('Method not implemented.');
    }

    findOneOrFail(id: string, options?: FindOneOptionCustom<Blog>, withDeleted?: boolean): Promise<Blog> {
        throw new Error('Method not implemented.');
    }
}
