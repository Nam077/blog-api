import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async checkExistByEmail(email: string): Promise<boolean> {
        return !!(await this.userRepository.findOne({
            where: {
                email: email,
            },
            withDeleted: true,
        }));
    }

    async create(createUserDto: CreateUserDto) {
        const { email, name, password, role } = createUserDto;

        if (await this.checkExistByEmail(email)) {
            throw new ConflictException('Email already exists');
        }

        return this.userRepository.save({
            email,
            name,
            password,
            role,
        });
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: string) {
        return await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: string) {
        return this.userRepository.softDelete(id);
    }

    async removeHard(id: string) {
        const user: User = await this.userRepository.findOne({
            where: {
                id,
            },
            withDeleted: true,
        });

        if (!user) {
            throw new NotFoundException('User không tồn tại');
        }

        if (!user.deleteDate) {
            throw new BadRequestException('User không được xoá mềm nên không thể xoá');
        }

        return this.userRepository.delete(id);
    }

    async restore(id: string) {
        const user: User = await this.userRepository.findOne({
            where: {
                id,
            },
            withDeleted: true,
        });

        if (!user) {
            throw new NotFoundException('User không tồn tại');
        }

        if (!user.deleteDate) {
            throw new BadRequestException('User không được xoá mềm nên không thể khôi phục');
        }

        return await this.userRepository.restore(id);
    }
}
