import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) { }
  async create(createCursoDto: CreateCursoDto, userId: number) {
    // Crear instancia y agregar el userId
    const nuevoCurso = this.cursoRepository.create({
      userId: userId,
      inicio: createCursoDto.inicio,
      fin: createCursoDto.fin,
      area: createCursoDto.area,
      especialidad: createCursoDto.especialidad,
    });

    // guardar en la base de datos
    return await this.cursoRepository.save(nuevoCurso);
  }

  async findAll() {
    return this.cursoRepository.find();
  }

  async findOne(codigoCurso: number) {
    const curso = await this.cursoRepository.findOneBy({ codigoCurso });
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${codigoCurso} no encontrada`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findOne(id);
    // Convertir codigoHabitacion a número 
    if (updateCursoDto.inicio) {
      updateCursoDto.inicio = new Date(updateCursoDto.inicio) as any;
    }
    if (updateCursoDto.fin) {
      updateCursoDto.fin = new Date(updateCursoDto.fin) as any;
    }
    Object.assign(curso, updateCursoDto);
    return this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
    return { message: `Curso con ID ${id} eliminada exitosamente` };
  }
}
