import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserAuth } from '../user/user.controller';
import { CategoryService } from './category.service';
import { CategoryFindAllDto } from './dto/blog-find-all.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.create(createCategoryDto, currentUser);
    }

    @Get()
    findAll(@Query() categoryFindAllDto: CategoryFindAllDto, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.findAll(categoryFindAllDto, currentUser);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.findOne(id, currentUser);
    }

    @Patch('restore/:id')
    restore(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.restore(id, currentUser);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @CurrentUser<UserAuth>() currentUser: UserAuth,
    ) {
        return this.categoryService.update(id, updateCategoryDto, currentUser);
    }

    @Delete('hard/:id')
    hardDelete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.delete(id, currentUser);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @CurrentUser<UserAuth>() currentUser: UserAuth) {
        return this.categoryService.softDelete(id, currentUser);
    }
}
