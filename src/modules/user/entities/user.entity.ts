import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BcryptServiceInstance, ROLE_USER } from '../../../common';
import { Blog } from '../../blog/entities/blog.entity';
import { Profile } from './profile.entity';

@Entity({
    name: 'users',
    comment: 'User table',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 150,
        unique: true,
        name: 'email',
        comment: 'Email của người dùng',
    })
    @Index()
    email: string;

    @Column({
        type: 'tinytext',
        name: 'password',
        comment: 'Mật khẩu của người dùng',
    })
    password: string;

    @Column({
        type: 'enum',
        name: 'role',
        default: ROLE_USER.USER,
        comment: 'Vai trò của người dùng',
        enum: ROLE_USER,
    })
    role: ROLE_USER;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'name',
        comment: 'Tên của người dùng',
    })
    name: string;

    @CreateDateColumn({
        name: 'create_date',
        comment: 'Ngày tạo của người dùng',
    })
    createDate: Date;

    @UpdateDateColumn({
        name: 'update_date',
        comment: 'Ngày chỉnh sửa của người dùng',
    })
    updateColumn: Date;

    @DeleteDateColumn({
        name: 'delete_date',
        comment: 'Ngày xoá của người dùng',
    })
    deleteDate: Date;

    // relationship

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn({
        name: 'profile_id',
    })
    profile: Profile;

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[];

    @BeforeInsert()
    @BeforeUpdate()
    validateData() {
        if (this.password) {
            this.password = BcryptServiceInstance.hash(this.password);
        }

        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }

    comparePassword(string: string): boolean {
        return BcryptServiceInstance.compare(string, this.password);
    }
}
