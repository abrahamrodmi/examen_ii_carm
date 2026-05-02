import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule { }
