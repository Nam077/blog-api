import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'tests',
})
export class Test {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;
}
