import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthResolver, PrismaService]
})
export class AuthModule {}
