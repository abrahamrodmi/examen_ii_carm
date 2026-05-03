import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) { }
  async create(createProfesorDto: CreateProfesorDto, userId: number) {
    const nuevoProfesor = this.profesorRepository.create({
      userId: userId,
      correo: createProfesorDto.correo,
      nombre: createProfesorDto.nombre,
      especialidad: createProfesorDto.especialidad,
    });

    return await this.profesorRepository.save(nuevoProfesor);
  }

  async findAll() {
    return this.profesorRepository.find();
  }

  async findOne(codigoProfesor: number) {
    const profesor = await this.profesorRepository.findOneBy({ codigoProfesor });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${codigoProfesor} no encontrado`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    const profesor = await this.findOne(id);
    if (updateProfesorDto.correo) {
      updateProfesorDto.correo = new Date(updateProfesorDto.correo) as any;
    }
    if (updateProfesorDto.nombre) {
      updateProfesorDto.nombre = new Date(updateProfesorDto.nombre) as any;
    }
    Object.assign(profesor, updateProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  async remove(id: number) {
    const profesor = await this.findOne(id);
    await this.profesorRepository.remove(profesor);
    return { message: `Profesor con ID ${id} eliminado exitosamente` };
  }
}
