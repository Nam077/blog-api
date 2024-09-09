import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Tên không được để trống' })
    @ApiProperty({
        description: 'Is name of user',
        example: 'Nam',
    })
    name: string;

    @Length(3, 25, {
        message: 'Password phải có 3 đến 25 ký tự',
    })
    @ApiProperty({
        description: 'Is password of user',
        example: 'Nampronam1',
    })
    password: string;

    @ApiProperty({
        description: 'Is email of user',
        example: 'nam@nam.com',
    })
    // allow gmail only email
    @Matches('^[a-zA-Z0-9_.+-]+@gmail.com$')
    email: string;

    @ApiProperty({
        description: 'Is username of user',
        example: '28364823746',
    })
    username: string;
}
