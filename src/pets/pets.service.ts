import { Injectable } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { CreatePetInput } from './dto';
import { Pet } from './pets.model';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  async createPet(createPetInput: Prisma.PetCreateInput): Promise<Pet> {
    // console.log(typeof data)
    // console.log(data);
    console.log('service');
    // return {
    //   id: "321321321321",
    //   name: "fewfew",
    //   type: "fefwafewa",
    // }
    return this.prismaService.pet.create({
      data: createPetInput
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.prismaService.pet.findMany();
  }
}
