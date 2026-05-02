import { IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/roles.enum';

export class CreateUserDto {
    @ApiProperty({ example: 'usuario' })
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty({ example: 'usuario' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username!: string;

    @ApiProperty({ example: 'password123', description: 'Mínimo 8 caracteres' })
    @IsString()
    @MinLength(8)
    password!: string;

    @ApiProperty({
        enum: Role,
        example: Role.USER,
        description: 'Rol asignado al usuario'
    })
    @IsEnum(Role)
    rol!: Role;
}

