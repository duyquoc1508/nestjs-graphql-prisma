import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY
    })
  ],
  providers: [AuthService, AuthResolver, PrismaService]
})
export class AuthModule {}
