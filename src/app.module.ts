import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CursoModule } from './curso/curso.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { UserModule } from './user/user.module';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
@Module({
  imports: [
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
          synchronize: true, 
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
    AuthModule,
    CursoModule,
    EstudianteModule,
    ProfesorModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
