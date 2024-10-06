import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { UserAuth } from '../user/user.controller';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogFindAllDto } from './dto/find-all.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
@ApiTags('Blog')
@ApiBearerAuth()
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    create(@Body() createCategoryDto: CreateBlogDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.create(createCategoryDto, currentUser);
    }

    @Get()
    findAll(@Query() blogFindAllDto: BlogFindAllDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.findAll(blogFindAllDto, currentUser);
    }

    @Get('slug/:slug')
    findOneBySlug(@Param('slug') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.findOneBySlug(id, currentUser);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.findOne(id, currentUser);
    }

    @Patch('restore/:id')
    restore(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.restore(id, currentUser);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBlogDto: UpdateBlogDto,
        @CurrentUser<UserAuth>() currentUser: UserAuth,
    ) {
        return this.blogService.update(id, updateBlogDto, currentUser);
    }

    @Delete('hard/:id')
    hardDelete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.delete(id, currentUser);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.blogService.softDelete(id, currentUser);
    }
}
