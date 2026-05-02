import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule { }
