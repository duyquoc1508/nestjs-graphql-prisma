import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { CreateUserInput } from './dto';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
