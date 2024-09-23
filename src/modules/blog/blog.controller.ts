import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { UserAuth } from '../user/user.controller';
import { BlogService, FindAllDtoBlog } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
    private userAuth: UserAuth = {
        id: 'sdfsdfsdfsdfdsfdsf',
    };

    private findAllBlogDto: FindAllDtoBlog = {};

    constructor(private readonly blogService: BlogService) {}

    @Post()
    create(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto, this.userAuth);
    }

    @Get()
    findAll() {
        return this.blogService.findAll(this.findAllBlogDto, this.userAuth);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id, this.userAuth);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto, this.userAuth);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogService.delete(id, this.userAuth);
    }
}
