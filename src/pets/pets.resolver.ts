import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
    console.log('resolver');
    console.log(createPetInput);
    return this.petService.createPet(createPetInput);
  }

  @Query((returns) => [Pet])
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }
}
