import { ForbiddenException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
  async create(createUserDto: CreateUserDto) {
    const { username, password, nombre } = createUserDto;

    const userExist = await this.userRepository.findOneBy({ username });
    if (userExist) {
      throw new ConflictException('El username ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      nombre,
      password: hashedPassword,
      rol: Role.USER,
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password: _, ...result } = savedUser;
    return result;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
