import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './models/user';
import { UserUpdateInput, UserUniqueInput } from './dto';
import { UserService } from './user.service';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  user(@CtxUser() user: User): Promise<User> {
    // return user;
    return this.userService.getUserInfo(user.id);
  }

  // update yourself profile
  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@CtxUser() user: User, @Args('data') data: UserUpdateInput): Promise<User> {
    return this.userService.updateUser(user.id, data);
  }
}
