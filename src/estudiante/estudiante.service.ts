import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }
  async create(createEstudianteDto: CreateEstudianteDto, userId: number) {
    const nuevoEstudiante = this.estudianteRepository.create({
      userId: userId,
      nombre: createEstudianteDto.nombre,
      edad: createEstudianteDto.edad,
      telefono: createEstudianteDto.telefono,
      direccion: createEstudianteDto.direccion,
    });

    return await this.estudianteRepository.save(nuevoEstudiante);
  }

  async findAll() {
    return this.estudianteRepository.find();
  }

  async findOne(DUI: number) {
    const estudiante = await this.estudianteRepository.findOneBy({ DUI });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${DUI} no encontrada`);
    }
    return estudiante;
  }

  async update(DUI: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(DUI);
    Object.assign(estudiante, updateEstudianteDto);
    return this.estudianteRepository.save(estudiante);
  }

  async remove(DUI: number) {
    const estudiante = await this.findOne(DUI);
    await this.estudianteRepository.remove(estudiante);
    return { message: `Estudiante con ID ${DUI} eliminada exitosamente` };
  }
}
