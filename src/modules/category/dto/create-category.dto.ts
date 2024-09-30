import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Tên của danh mục',
        example: 'Technology',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Mô tả ngắn của danh mục',
        example: 'All about technology',
    })
    @IsOptional()
    @IsString()
    description?: string;
}
