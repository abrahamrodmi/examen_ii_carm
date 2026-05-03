import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { Role } from '../enums/roles.enum';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class AuthService implements OnModuleInit {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    //Crear ADMIN inicial por si no se desea manual
    async onModuleInit() {
        const adminExists = await this.userRepository.findOneBy({
            username: 'admin',
        });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await this.userRepository.save({
                username: 'admin',
                nombre: 'Administrador',
                password: hashedPassword,
                rol: Role.ADMIN,
            });
        }
    }

    // Crear usuario
    async create(createUserDto: CreateUserDto) {
        const { username, password, nombre } = createUserDto;

        const userExist = await this.userRepository.findOneBy({ username });

        if (userExist) {
            throw new ConflictException({
                statusCode: 400,
                error: 'Conflict',
                message: ['El username ya existe'],
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            username,
            nombre,
            password: hashPassword,
            rol: Role.USER,
        });

        const savedUser = await this.userRepository.save(newUser);

        return {
            userId: savedUser.userId,
            nombre: savedUser.nombre,
            username: savedUser.username,
            rol: savedUser.rol,
        } as ResponseUserDto;
    }

    // Login
    async login(loginUserDto: LoginUserDto) {
        const { username, password } = loginUserDto;

        const userExist = await this.userRepository.findOneBy({ username });

        if (!userExist) {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: ['Credenciales inválidas'],
            });
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);

        if (!matchPassword) {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: ['Credenciales inválidas'],
            });
        }

        const payload = {
            sub: userExist.userId,
            name: userExist.nombre,
            username: userExist.username,
            rol: userExist.rol,
        };

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    // Listar usuarios
    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.userRepository.find();

        return users.map(user => ({
            userId: user.userId,
            nombre: user.nombre,
            username: user.username,
            rol: user.rol,
        } as ResponseUserDto));
    }
}
