import { IsNotEmpty, IsString, MinLength, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../enums/roles.enum";

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    rol!: Role;

}