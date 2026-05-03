import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Roles } from './roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ type: User, description: "Usuario creado exitosamente" })
    @ApiResponse({ status: 400, description: 'El email ya existe' })
    @Post('/register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    @ApiBody({ type: LoginUserDto })
    @ApiCreatedResponse({ type: User, description: "Acceso concedido", schema: { example: { token: "token" } } })
    @ApiNotFoundResponse({ description: "El usuario no existe" })
    @ApiUnauthorizedResponse({ description: "Password incorrecto" })
    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Get('profile')
    @Roles(Role.ADMIN, Role.DEVELOPER, Role.USER)
    @ApiOperation({ summary: 'Obtener los datos del usuario actual (Token)' })
    @ApiResponse({ status: 200, description: 'Perfil recuperado con éxito', type: User })
    @ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' })
    @ApiResponse({ status: 403, description: 'No tienes permisos para ver este perfil' })
    findMyProfile(@Request() req) {
        // En NestJS, el ID suele venir en req.user tras pasar el AuthGuard
        const id = req.user.userId;
        return this.userService.findOne(id);
    }

}
