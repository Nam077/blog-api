import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserFindAllDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

export interface UserAuth {
    id: string;
}

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
    private userAuth: UserAuth = {
        id: 'sdfsdfsdfsdfdsfdsf',
    };

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto, this.userAuth);
    }

    @Get()
    findAll(@Query() userFindAllDto: UserFindAllDto) {
        return this.userService.findAll(userFindAllDto, this.userAuth);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id, this.userAuth);
    }

    @Patch('restore/:id')
    resore(@Param('id') id: string) {
        return this.userService.restore(id, this.userAuth);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto, this.userAuth);
    }

    @Delete('hard/:id')
    removeHard(@Param('id') id: string) {
        return this.userService.delete(id, this.userAuth);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.softDelete(id, this.userAuth);
    }
}
