import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { REGEX_EMAIL } from '../../user/dto/create-user.dto';

export class LoginDto {
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
}
