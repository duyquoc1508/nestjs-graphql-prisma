import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Pet } from './pets.model';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput
  ): Promise<Pet> {
    console.log(createPetInput);
    return this.petService.createPet(createPetInput);
  }

  @Query((returns) => [Pet])
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Query((returns) => Pet)
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Pet> {
    return this.petService.getPet(id);
  }
}
