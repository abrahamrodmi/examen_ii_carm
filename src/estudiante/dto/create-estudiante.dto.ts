import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateEstudianteDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    edad!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    direccion!: string;

}

