import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: envs.seed,
    signOptions: {expiresIn: '1m'},
  })],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, // BS
  ],
})
export class AuthModule {}
