import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Blog } from '../../blog/entities/blog.entity';

@Entity({
    name: 'categories',
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'tinytext',
        name: 'name',
        comment: 'Tên của danh mục',
    })
    name: string;

    @Column({
        type: 'tinytext',
        name: 'slug',
        comment: 'Slug của danh mục',
    })
    slug: string;

    @Column({
        type: 'tinytext',
        name: 'description',
        comment: 'Mô tả ngắn của danh mục',
    })
    desciption: string;

    @CreateDateColumn({
        name: 'create_date',
        comment: 'Ngày tạo của danh mục',
    })
    createDate: Date;

    @UpdateDateColumn({
        name: 'update_date',
        comment: 'Ngày chỉnh sửa của danh mục',
    })
    updateColumn: Date;

    @DeleteDateColumn({
        name: 'delete_date',
        comment: 'Ngày xoá của danh mục',
    })
    deleteDate: Date;

    // relationship

    @OneToMany(() => Blog, (blog) => blog.category)
    blogs: Blog[];
}
