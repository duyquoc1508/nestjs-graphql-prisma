import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from 'src/role/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    PetsService,
    PetsResolver,
    PrismaService
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard // warning: focus order of authentication required before authorization
    // }
  ]
})
export class PetsModule {}
