import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './models/user';
import { UserCreateInput, UserUpdateInput, UserUniqueInput } from './dto';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findMany();
  }

  @Mutation((returns) => User)
  updateUser(
    @Args('where') where: UserUniqueInput,
    @Args('data') data: UserUpdateInput
  ): Promise<User> {
    return this.userService.update(where, data);
  }
}
