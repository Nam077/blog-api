import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
export abstract class FindAllDtoBase {
    @ApiPropertyOptional({
        description: 'Từ khóa tìm kiếm',
        example: 'John',
    })
    @IsString({
        message: 'Từ khóa tìm kiếm phải là dạng chữ',
    })
    @IsOptional()
    search: string;

    @ApiPropertyOptional({
        description: 'Trang hiện tại',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({
        description: 'Số lượng bản ghi trên mỗi trang',
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(100)
    limit: number = 10;

    @ApiPropertyOptional({
        description: 'Sắp xếp theo kiểu',
        example: SortDirection.ASC,
        enum: SortDirection,
    })
    @IsEnum(SortDirection)
    sort: SortDirection = SortDirection.ASC;
}
