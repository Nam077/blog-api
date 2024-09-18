import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APIResponseData, CrudInterface, PaginationData } from 'src/common/interfaces';
import { Repository } from 'typeorm';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

interface FindAllDtoBlog {}
interface UserAuth {
    id: string;
    email: string;
    name: string;
    role: string;
}
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
}
