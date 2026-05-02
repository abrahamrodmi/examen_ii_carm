import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfesorDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    correo!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    especialidad!: string;

}
