import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/role/guards/role.guard';

@Module({
  providers: [
    PetsService,
    PetsResolver,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class PetsModule {}
