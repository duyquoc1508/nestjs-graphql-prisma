import { Injectable } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { CreatePetInput } from './dto';
import { Pet } from './pets.model';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    return this.prismaService.pet.create({
      data: createPetInput
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.prismaService.pet.findMany();
  }

  async getPet(id: string): Promise<Pet> {
    return this.prismaService.pet.findUnique({
      where: {
        id
      }
    });
  }
}
