import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';

import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from '../../common';
import { UserAuth } from '../user/user.controller';
import { CreateTagOrFindDto } from './dto/creat-tag-or-find.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagFindAllDto } from './dto/find-all.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService
    implements
        CrudInterface<
            Tag,
            CreateTagDto,
            UpdateTagDto,
            TagFindAllDto,
            PaginationData<Tag>,
            APIResponseData<Tag>,
            UserAuth
        >
{
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    findOneEntity(id: string, options?: FindOneOptionCustom<Tag>, withDeleted?: boolean): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    findAllEntity(findAllDto: TagFindAllDto, withDeleted?: boolean): Promise<PaginationData<Tag>> {
        throw new Error('Method not implemented.');
    }

    findAll(findAllDto: TagFindAllDto, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    createEntity(createDto: CreateTagDto): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    create(createDto: CreateTagDto, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    updateEntity(id: string, updateDto: UpdateTagDto): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    update(id: string, updateDto: UpdateTagDto, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    deleteEntity(id: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    delete(id: string, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    restoreEntity(id: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    restore(id: string, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    softDeleteEntity(id: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<Tag>> {
        throw new Error('Method not implemented.');
    }

    findOneOrFail(id: string, options?: FindOneOptionCustom<Tag>, withDeleted?: boolean): Promise<Tag> {
        throw new Error('Method not implemented.');
    }

    findOneBySlug(id: string, currentUser: UserAuth) {
        throw new Error('Method not implemented.');
    }

    async findOrCreate(createTagOrFindDto: CreateTagOrFindDto) {
        const { tags } = createTagOrFindDto;

        const tagEntities = await Promise.all(
            tags.map(async (tag) => {
                const tagEntity = await this.tagRepository.findOne({ where: { name: tag } });

                if (tagEntity) {
                    return tagEntity;
                }

                const slug = slugify(tag, { lower: true });

                return this.tagRepository.save({ name: tag, slug });
            }),
        );

        return tagEntities;
    }
}
