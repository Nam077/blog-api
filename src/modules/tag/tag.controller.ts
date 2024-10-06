import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CurrentUser } from '../../common';
import { UserAuth } from '../user/user.controller';
import { CreateTagOrFindDto } from './dto/creat-tag-or-find.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagFindAllDto } from './dto/find-all.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    create(@Body() createTagDto: CreateTagDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.create(createTagDto, currentUser);
    }

    @Post('findOrCreate')
    findOrCreat(@Body() createTagOrFindDto: CreateTagOrFindDto) {
        return this.tagService.findOrCreate(createTagOrFindDto);
    }

    @Get()
    findAll(@Query() tagFindAllDto: TagFindAllDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.findAll(tagFindAllDto, currentUser);
    }

    @Get('slug/:slug')
    findOneBySlug(@Param('slug') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.findOneBySlug(id, currentUser);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.findOne(id, currentUser);
    }

    @Patch('restore/:id')
    restore(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.restore(id, currentUser);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTagDto: UpdateTagDto,
        @CurrentUser<UserAuth>() currentUser: UserAuth,
    ) {
        return this.tagService.update(id, updateTagDto, currentUser);
    }

    @Delete('hard/:id')
    hardDelete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.delete(id, currentUser);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.tagService.softDelete(id, currentUser);
    }
}
