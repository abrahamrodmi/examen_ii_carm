import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/roles.enum';

export class ResponseUserDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    username: string;

    @ApiProperty({ enum: Role })
    rol: Role;
}