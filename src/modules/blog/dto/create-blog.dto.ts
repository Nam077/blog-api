import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { BlogStatus } from '../../../common';

export class CreateBlogDto {
    @ApiProperty({
        description: 'Tên của bài viết',
        example: 'Bài viết số 1',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Ảnh đại diện của bài viết',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    @IsNotEmpty()
    avatar: string;

    @ApiProperty({
        description: 'Mô tả ngắn của bài viết',
        example: 'Mô tả ngắn của bài viết số 1',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Trạng thái của bài viết',
        example: BlogStatus.INACTIVE,
        enum: BlogStatus,
        default: BlogStatus.INACTIVE,
    })
    @IsEnum(BlogStatus)
    @IsOptional()
    status: BlogStatus;

    @ApiProperty({
        description: 'Nội dung của bài viết',
        example: 'Nội dung của bài viết số 1',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: 'Danh sách tag của bài viết',
        example: ['tag1', 'tag2'],
    })
    @IsString({ each: true })
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: 'Danh mục của bài viết',
        example: 'd4b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    })
    @IsUUID('all')
    categoryId: string;

    @ApiProperty({
        description: 'Người tạo bài viết',
        example: 'd4b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    })
    @IsUUID('all')
    userId: string;
}
