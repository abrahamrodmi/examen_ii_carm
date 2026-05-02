import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CursoModule } from './curso/curso.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
@Module({
  imports: [
    // 1. Corregido: envFilePath debe apuntar al nombre del archivo físico (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true, // Ideal para tu avance del 4to semestre
          // Cambiamos la estructura de SSL para asegurar que el driver lo reconozca
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
  ],
})
export class AppModule { }
