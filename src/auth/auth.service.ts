import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from '../user/dto/response-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) {
    }

    async create(createUserDto: CreateUserDto) {
        const numRound = 10;
        const { username, password } = createUserDto;
        const userExist = await this.userRepository.findOneBy({ username });
        if (userExist) {
            const error = {
                "statusCode": 400,
                "error": "conflict",
                "message": ["El email ya existe"]
            }
            //Si se cumple  el usuario existe en la DB
            throw new ConflictException(error);
        }
        //encriptar  el password
        const hashPassword = await bcrypt.hash(password, numRound);
        createUserDto.password = hashPassword;
        //guardar
        const savedUser = await this.userRepository.save(createUserDto);
        return { userId: savedUser.userId, nombre: savedUser.nombre, username: savedUser.username, rol: savedUser.rol } as ResponseUserDto;
    }

    async login(LoginUserDto: LoginUserDto) {
        //Desestructurar
        const { username, password } = LoginUserDto;
        //Verificar que el email existe
        const userExist = await this.userRepository.findOneBy({ username });
        if (!userExist) {
            const error = {
                "statusCode": 401,
                "error": "Not Found",
                "message": ["El usuario no existe"]
            }
            throw new NotFoundException(error)
        }
        //Comparar que pw sean iguales
        const matchPassword = await bcrypt.compare(password, userExist.password);
        if (!matchPassword) {
            const error = {
                "statusCode": 404,
                "error": "Unauthorized exception",
                "message": ["Password incorrecto"]
            }
            throw new UnauthorizedException(error);
            //Si son iguales retornar jwt
        }
        const payload = {
            sub: userExist.userId,
            name: userExist.nombre,
            username: userExist.username,
            rol: userExist.rol
        }

        const token = await this.jwtService.signAsync(payload)
        return {
            token,

        };
    }

    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.userRepository.find();
        return users.map(user => ({ userId: user.userId, nombre: user.nombre, username: user.username, rol: user.rol } as ResponseUserDto));
    }

}
