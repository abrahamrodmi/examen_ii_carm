import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('cursos')
export class Curso {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    codigoCurso!: number;

    @ApiProperty()
    @Column({ type: 'date' })
    inicio!: Date;

    @ApiProperty()
    @Column({ type: 'date' })
    fin!: Date;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    area!: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    especialidad!: string;

    @ApiProperty()
    @Column()
    userId!: number;

}
