import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

@Controller('test')
@ApiTags('Test')
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Post()
    create(@Body() createTestDto: CreateTestDto) {
        return this.testService.create(createTestDto);
    }

    @Get()
    findAll() {
        return this.testService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.testService.update(+id, updateTestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testService.remove(id);
    }
}
