import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Pet } from './pets.model';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Roles } from 'src/role/decorators/role.decorator';
import { Role } from 'src/role/enum/role.enum';
import { RolesGuard } from 'src/role/guards/role.guard';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Mutation((returns) => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    console.log(createPetInput);
    return this.petService.createPet(createPetInput);
  }

  @Query((returns) => [Pet])
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard) // require authentication before authorization
  @Roles(Role.Admin)
  @Query((returns) => Pet)
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Pet> {
    return this.petService.getPet(id);
  }
}
