import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Profesor } from './entities/profesor.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('profesor')
@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateProfesorDto })
  @ApiCreatedResponse({ type: Profesor, description: "Profesor creado exitosamente" })
  @ApiUnauthorizedResponse({ description: "No autorizado / Token inválido" })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async create(@Body() createProfesorDto: CreateProfesorDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.profesorService.create(createProfesorDto, userId);
  }

  @ApiOkResponse({ type: [Profesor], description: "Lista de todas los profesores" })
  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @ApiOkResponse({ type: Profesor, description: "Información del profesor solicitado" })
  @ApiNotFoundResponse({ description: "Profesor no encontrado" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateProfesorDto })
  @ApiOkResponse({ type: Profesor, description: "Profesor modificado exitosamente" })
  @ApiNotFoundResponse({ description: "Profesor no encontrado" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: "Profesor eliminado exitosamente" })
  @ApiNotFoundResponse({ description: "Profesor no encontrado" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}