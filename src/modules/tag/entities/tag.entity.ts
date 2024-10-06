import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Blog } from '../../blog/entities/blog.entity';

@Entity({
    name: 'tags',
})
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'tinytext',
        name: 'name',
        comment: 'Tên của tag',
    })
    name: string;

    @Column({
        type: 'tinytext',
        name: 'slug',
        comment: 'Slug của tag',
    })
    slug: string;

    @Column({
        type: 'tinytext',
        name: 'description',
        comment: 'Mô tả ngắn của tag',
        nullable: true,
    })
    desciption: string;

    @CreateDateColumn({
        name: 'create_date',
        comment: 'Ngày tạo của tag',
    })
    createDate: Date;

    @UpdateDateColumn({
        name: 'update_date',
        comment: 'Ngày chỉnh sửa của tag',
    })
    updateColumn: Date;

    @DeleteDateColumn({
        name: 'delete_date',
        comment: 'Ngày xoá của tag',
    })
    deleteDate: Date;

    // relationship

    @ManyToMany(() => Blog, (blog) => blog.tags)
    blogs: Blog[];
}
