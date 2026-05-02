import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CursoModule } from './curso/curso.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        // Aiven y Render suelen proporcionar una URL completa (DATABASE_URL)
        const databaseUrl = configService.get<string>('DATABASE_URL');

        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    AuthModule,
    CursoModule,
  ],
})
export class AppModule { }
