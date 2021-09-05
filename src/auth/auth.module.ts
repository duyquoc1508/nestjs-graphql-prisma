import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY
      // signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
