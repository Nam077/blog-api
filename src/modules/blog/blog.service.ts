import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserService } from './../user/user.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    create(createBlogDto: CreateBlogDto) {
        return 'This action adds a new blog';
    }

    findAll() {
        return `This action returns all blog`;
    }

    findOne(id: number) {
        return `This action returns a #${id} blog`;
    }

    update(id: number, updateBlogDto: UpdateBlogDto) {
        return `This action updates a #${id} blog`;
    }

    remove(id: number) {
        return `This action removes a #${id} blog`;
    }
}
