import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { ROLE_USER, ToUpperCase } from '../../../common';

const REGEX_EMAIL =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export class CreateUserDto {
    @ApiProperty({
        description: 'Email của người dùng',
        example: 'demo@gmail.com',
    })
    @IsNotEmpty({
        message: 'Email không được để trống',
    })
    @Matches(REGEX_EMAIL, {
        message: 'Email không hợp lệ match với regex',
    })
    email!: string;

    @ApiProperty({
        description: 'Mật khẩu của người dùng',
        example: '23984562389463287',
    })
    @IsString({
        message: 'Mật khẩu phải là dạng chữ',
    })
    @IsNotEmpty({
        message: 'Mật khẩu không được để trống',
    })
    @Length(5, 100, {
        message: 'Độ dài của password từ 5 - 100 ký tự',
    })
    password!: string;

    @ApiProperty({
        description: 'Tên của người dùng',
        example: 'John',
    })
    @IsNotEmpty({
        message: 'Tên không được để trống',
    })
    @Length(2, 255, {
        message: 'Độ dài của tên từ 2 - 255 ký tự',
    })
    @IsString({
        message: 'Tên phải là dạng chữ',
    })
    @ToUpperCase()
    name!: string;

    @ApiProperty({
        description: 'Vai trò của người dùng',
        example: ROLE_USER.USER,
    })
    @IsNotEmpty({
        message: 'Vai trò không được để trống',
    })
    @IsIn([ROLE_USER.ADMIN, ROLE_USER.USER], {
        message: `Vai trò không hợp lệ. Vai trò phải nằm trong [${Object.values(ROLE_USER)}]`,
    })
    role!: ROLE_USER;
}
