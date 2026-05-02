import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCursoDto {

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    inicio!: Date;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    fin!: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    area!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    especialidad!: string;
}
