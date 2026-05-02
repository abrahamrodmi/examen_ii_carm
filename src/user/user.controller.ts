import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

import { Role } from '../enums/roles.enum';

@ApiTags('users') // Agrupa el endpoint en la sección de usuarios
@ApiBearerAuth()  // Indica que requiere el token JWT para probarlo
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles(Role.DEVELOPER)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @Roles(Role.DEVELOPER)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/make-admin')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Convertir un usuario en administrador' })
  @ApiParam({ name: 'id', description: 'ID único del usuario (UUID)', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'El usuario ahora es administrador.' })
  @ApiResponse({ status: 403, description: 'Prohibido: No tienes permisos de ADMIN.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async makeAdmin(@Param('id') id: number) {
    return await this.userService.makeAdmin(id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DEVELOPER)
  findAll() {
    return this.userService.findAll();
  }
}

