import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity({
    name: 'profiles',
})
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
        name: 'phone',
        comment: 'Số điện thoại của người dùng',
    })
    phone: string;

    @Column({
        type: 'tinytext',
        name: 'address',
        comment: 'Địa chỉ của người dùng',
    })
    address: string;

    // relationship

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}
