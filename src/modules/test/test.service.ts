import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test)
        private testRepository: Repository<Test>,
    ) {}

    async create(createTestDto: CreateTestDto) {
        return await this.testRepository.save(createTestDto);
    }

    async findAll() {
        return await this.testRepository.find({});
    }

    async findOne(id: string) {
        return await this.testRepository.findOneBy({ id });
    }

    update(id: number, updateTestDto: UpdateTestDto) {
        return `This action updates a #${id} test`;
    }

    remove(id: string) {
        return this.testRepository.delete(id);
    }
}
