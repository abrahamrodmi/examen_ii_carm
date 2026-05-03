import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // ESTO ES LO QUE FALTA:
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule { }
