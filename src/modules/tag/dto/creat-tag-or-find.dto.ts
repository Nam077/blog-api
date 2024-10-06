import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateTagOrFindDto {
    @ApiProperty({
        description: 'Danh sách tag',
        example: ['tag1', 'tag2'],
    })
    @IsArray()
    @IsString({ each: true })
    tags: string[];
}
