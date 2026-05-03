import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../../enums/roles.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Don Usuario XD', required: false })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ example: 'don_usuario_xd', required: false })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({
        enum: Role,
        example: Role.USER,
        required: false,
        description: 'Roles disponibles: ADMIN, DEVELOPER, USER'
    })
    @IsEnum(Role)
    @IsOptional()
    rol?: Role;
}