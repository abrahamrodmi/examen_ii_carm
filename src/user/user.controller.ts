import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

import { Role } from '../enums/roles.enum';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles(Role.DEVELOPER)
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({ status: 201, type: User }) // Esto vincula el Schema al endpoint
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @Roles(Role.DEVELOPER)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar usuario' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/make-admin')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Convertir un usuario en administrador' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async makeAdmin(@Param('id') id: string) { // Cambiado a string para consistencia
    return await this.userService.makeAdmin(+id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DEVELOPER)
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.userService.findAll();
  }
}
