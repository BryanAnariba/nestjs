import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JWTRefreshStrategy, JWTStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'process';

@Module({
  imports: [
    PrismaModule, 
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy, // bs
    JWTRefreshStrategy, // bs
  ],
})
export class AuthModule {}
