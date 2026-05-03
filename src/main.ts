import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  console.log('=== DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);
  const authService = app.get(AuthService);
  await authService.onModuleInit();
  const config = new DocumentBuilder()
    .setTitle('Examen II')
    .setDescription('API de cursos')
    .setVersion('1.0')
    .addTag('Cursos')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'servidor local')
    .addServer('https://examen-ii-carm.onrender.com', 'servidor en nube')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({ origin: ['https://examen-ii-carm.onrender.com', 'http://localhost:3000'], })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // SOLO PARA ESTA VEZ: Forzar el admin
  const userService = app.get(UserService);
  await userService.makeAdmin(9);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

