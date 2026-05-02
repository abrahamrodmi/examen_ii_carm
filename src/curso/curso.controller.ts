import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CursoService } from './curso.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Curso } from './entities/curso.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('curso')
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateCursoDto })
  @ApiCreatedResponse({ type: Curso, description: "Curso creado exitosamente" })
  @ApiUnauthorizedResponse({ description: "No autorizado / Token inválido" })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async create(@Body() createCursoDto: CreateCursoDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.cursoService.create(createCursoDto, userId);
  }

  @ApiOkResponse({ type: [Curso], description: "Lista de todas los cursos" })
  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @ApiOkResponse({ type: Curso, description: "Información del curso solicitado" })
  @ApiNotFoundResponse({ description: "Curso no encontrado" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateCursoDto })
  @ApiOkResponse({ type: Curso, description: "Curso modificado exitosamente" })
  @ApiNotFoundResponse({ description: "Curso no encontrado" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: "Curso eliminado exitosamente" })
  @ApiNotFoundResponse({ description: "Curso no encontrado" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
