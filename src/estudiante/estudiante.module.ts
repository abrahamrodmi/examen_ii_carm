import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule { }
