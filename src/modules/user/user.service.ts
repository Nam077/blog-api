import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BcryptServiceInstance } from '../../common';
import { APIResponseData, CrudInterface, FindOneOptionCustom, PaginationData } from '../../common/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserAuth } from './user.controller';

export class UserFindAllDto {}
@Injectable()
export class UserService
    implements
        CrudInterface<
            User,
            CreateUserDto,
            UpdateUserDto,
            UserFindAllDto,
            PaginationData<User>,
            APIResponseData<User>,
            UserAuth
        >
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async checkExitsByEmail(email: string): Promise<boolean> {
        return await this.userRepository.exists({
            where: {
                email: email,
            },
            withDeleted: true,
        });
    }

    async findOneEntity(id: string, options?: FindOneOptionCustom<User>, withDeleted?: boolean): Promise<User> {
        return this.userRepository.findOne({
            where: { id: id },
            ...options,
            withDeleted: withDeleted,
        });
    }

    async findOne(id: string, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user: User = await this.findOneOrFail(
            id,
            {
                order: {
                    name: 'ASC',
                },
            },
            false,
        );

        return {
            message: `Lấy thành công user có id: ${id} thành công`,
            status: HttpStatus.FOUND,
            data: user,
        };
    }

    findAllEntity(findAllDto: UserFindAllDto, withDeleted?: boolean): Promise<PaginationData<User>> {
        throw new Error('Method not implemented.');
    }

    findAll(findAllDto: UserFindAllDto, currentUser: UserAuth): Promise<APIResponseData<User>> {
        throw new Error('Method not implemented.');
    }

    async createEntity(createDto: CreateUserDto): Promise<User> {
        const { email } = createDto;

        if (await this.checkExitsByEmail(email)) {
            throw new ConflictException('User đã tồn tại');
        }

        const user: User = this.userRepository.create(createDto);

        return await this.userRepository.save(user);
    }

    async create(createDto: CreateUserDto, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user: User = await this.createEntity(createDto);

        return {
            message: 'Tạo người dùng thành công',
            status: HttpStatus.CREATED,
            data: user,
        };
    }

    async updateEntity(id: string, updateDto: UpdateUserDto): Promise<User> {
        const { email } = updateDto;
        const user = await this.findOneOrFail(id, {}, true);

        if (user.email != email && (await this.checkExitsByEmail(email))) {
            throw new ConflictException('Email đã tồn tại');
        }

        if (updateDto.password) {
            updateDto.password = BcryptServiceInstance.hash(updateDto.password);
        }

        await this.userRepository.update(id, updateDto);

        return await this.findOneOrFail(id, {}, true);
    }

    async update(id: string, updateDto: UpdateUserDto, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user: User = await this.updateEntity(id, updateDto);

        return {
            message: 'Cập nhật user thành công',
            status: HttpStatus.OK,
            data: user,
        };
    }

    async deleteEntity(id: string): Promise<User> {
        const user = await this.findOneOrFail(id, {}, true);

        if (!user.deleteDate) {
            throw new BadRequestException('User này chưa xoá mềm nên không thể xoá vĩnh viễn');
        }

        await this.userRepository.delete(id);

        return user;
    }

    async delete(id: string, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user = await this.deleteEntity(id);

        return {
            message: 'Xóa vĩnh viễn user thành công',
            status: HttpStatus.OK,
            data: user,
        };
    }

    async softDeleteEntity(id: string): Promise<User> {
        const user = await this.findOneOrFail(id, {}, true);

        if (user.deleteDate) {
            throw new BadRequestException('User đã bị xóa');
        }

        await this.userRepository.softDelete(id);

        return user;
    }

    async softDelete(id: string, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user = await this.softDeleteEntity(id);

        return {
            message: 'Xóa user thành công',
            status: HttpStatus.OK,
            data: user,
        };
    }

    async findOneOrFail(id: string, options?: FindOneOptionCustom<User>, withDeleted?: boolean): Promise<User> {
        const user: User = await this.findOneEntity(
            id,
            {
                order: {
                    name: 'ASC',
                },
            },
            withDeleted,
        );

        if (!user) {
            throw new NotFoundException('Không tìm thấy user');
        }

        return user;
    }

    async restoreEntity(id: string): Promise<User> {
        const user = await this.findOneOrFail(id, {}, true);

        if (!user.deleteDate) {
            throw new BadRequestException('User này chưa xoá mềm nên không thể khôi phục');
        }

        await this.userRepository.restore(id);

        return user;
    }

    async restore(id: string, currentUser: UserAuth): Promise<APIResponseData<User>> {
        const user = await this.restoreEntity(id);

        return {
            message: 'Khôi phục user thành công',
            status: HttpStatus.OK,
            data: user,
        };
    }
}
