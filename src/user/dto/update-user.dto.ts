import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../../enums/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Don Usuario XD', required: false })
    nombre?: string;

    @ApiProperty({ example: 'don_usuario_xd', required: false })
    username?: string;

    @ApiProperty({
        enum: Role,
        example: Role.USER,
        required: false,
        description: 'Roles disponibles: ADMIN, DEVELOPER, USER'
    })
    rol?: Role; // <-- Usa el Enum aquí en lugar de string
}