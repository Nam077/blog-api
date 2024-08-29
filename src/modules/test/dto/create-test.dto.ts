import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
    @ApiProperty({
        description: 'The name of the test',
        type: String,
        example: 'Test 1',
    })
    name: string;
}
