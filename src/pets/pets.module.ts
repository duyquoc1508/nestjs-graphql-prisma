import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PetsService, PetsResolver, PrismaService]
})
export class PetsModule {}
