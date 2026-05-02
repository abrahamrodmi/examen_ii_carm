import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async makeAdmin(id: number) {
    // 1. Buscamos al usuario por ID
    const user = await this.userRepository.findOneBy({ userId: id });

    // 2. Si no existe, lanzamos una excepción de NestJS
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // 3. Actualizamos el rol (Asegúrate de que 'role' sea el nombre exacto en tu entidad)
    user.rol = Role.ADMIN;

    // 4. Guardamos los cambios en la base de datos de Aiven
    return await this.userRepository.save(user);
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
