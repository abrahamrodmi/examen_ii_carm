import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('profesor')
export class Profesor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    codigoProfesor!: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    correo!: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    nombre!: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    especialidad!: string;

    @ApiProperty()
    @Column()
    userId!: number;

}
