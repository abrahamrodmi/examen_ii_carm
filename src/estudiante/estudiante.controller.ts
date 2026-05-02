import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Estudiante } from './entities/estudiante.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('estudiante')
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateEstudianteDto })
  @ApiCreatedResponse({ type: Estudiante, description: "Estudiante creado exitosamente" })
  @ApiUnauthorizedResponse({ description: "No autorizado / Token inválido" })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async create(@Body() createEstudianteDto: CreateEstudianteDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.estudianteService.create(createEstudianteDto, userId);
  }

  @ApiOkResponse({ type: [Estudiante], description: "Lista de todas los estudiantes" })
  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @ApiOkResponse({ type: Estudiante, description: "Información del estudiante solicitado" })
  @ApiNotFoundResponse({ description: "Estudiante no encontrado" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateEstudianteDto })
  @ApiOkResponse({ type: Estudiante, description: "Estudiante modificado exitosamente" })
  @ApiNotFoundResponse({ description: "Estudiante no encontrado" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: "Estudiante eliminado exitosamente" })
  @ApiNotFoundResponse({ description: "Estudiante no encontrado" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}

