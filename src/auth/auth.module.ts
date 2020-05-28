import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import {PassportModule} from '@nestjs/passport'
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: ''
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
