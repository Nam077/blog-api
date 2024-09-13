import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BlogStatus } from '../../../common';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
    name: 'blogs',
})
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'tinytext',
        name: 'title',
        comment: 'Tên của bài viết',
    })
    title: string;

    @Column({
        type: 'tinytext',
        name: 'slug',
        comment: 'Slug của bài viết',
    })
    slug: string;

    @Column({
        type: 'tinytext',
        name: 'avatar',
        comment: 'Ảnh đại diện của bài viết',
    })
    avatar: string;

    @Column({
        type: 'tinytext',
        name: 'description',
        comment: 'Mô tả ngắn của bài viết',
    })
    desciption: string;

    @Column({
        type: 'enum',
        name: 'status',
        comment: 'Trạng thái của bài viết',
        enum: BlogStatus,
        default: BlogStatus.INACTIVE,
    })
    status: BlogStatus;

    @Column({
        type: 'longtext',
        name: 'content',
        comment: 'Nội dung của bài viết',
    })
    content: string;

    @CreateDateColumn({
        name: 'create_date',
        comment: 'Ngày tạo của bài viết',
    })
    createDate: Date;

    @UpdateDateColumn({
        name: 'update_date',
        comment: 'Ngày chỉnh sửa của bài viết',
    })
    updateColumn: Date;

    @DeleteDateColumn({
        name: 'delete_date',
        comment: 'Ngày xoá của bài viết',
    })
    deleteDate: Date;

    // relationship

    @ManyToOne(() => User, (user) => user.blogs)
    @JoinColumn({
        name: 'user_id',
    })
    user: User;

    @ManyToOne(() => Category, (category) => category.blogs)
    @JoinColumn({
        name: 'category_id',
    })
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.blogs)
    @JoinTable({
        name: 'blog_tag',
        joinColumn: {
            name: 'tag_id',
        },
        inverseJoinColumn: {
            name: 'blog_id',
        },
    })
    tags: Tag[];
}
