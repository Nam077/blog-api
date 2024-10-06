import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { FindAllDtoBase } from '../../../common/classes/find-all.dto';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
export enum SortField {
    ID = 'id',
    NAME = 'name',
    DESCRIPTION = 'description',
    SLUG = 'slug',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    DELETED_AT = 'deletedAt',
}
export class BlogFindAllDto extends FindAllDtoBase {
    @ApiPropertyOptional({
        description: 'Sắp xếp theo trường',
        example: SortField.ID,
        enum: SortField,
    })
    @IsEnum(SortField)
    sortField: SortField = SortField.ID;
}
