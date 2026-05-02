import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('estudiante')
export class Estudiante {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    DUI!: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    nombre!: string;

    @ApiProperty()
    @Column({ type: 'int' })
    edad!: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 10 })
    telefono!: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 100 })
    direccion!: string;

    @ApiProperty()
    @Column()
    userId!: number;

}
