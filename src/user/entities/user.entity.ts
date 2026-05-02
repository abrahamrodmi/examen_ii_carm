import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../../enums/roles.enum';
import { ApiProperty } from "@nestjs/swagger";

@Entity('usuarios')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    userId!: number;

    @ApiProperty()
    @Column({ unique: true })
    nombre!: string;

    @ApiProperty()
    @Column({ unique: true })
    username!: string;

    @ApiProperty()
    @Column()
    password!: string;

    @ApiProperty({ enum: Role })
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    rol!: Role;


}   
