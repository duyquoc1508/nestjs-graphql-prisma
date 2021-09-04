import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthRegisterInput } from './dto';
import { AuthLoginInput } from './dto/auth-login.input';
import { UserToken } from './models/user-token';

@Resolver((of) => UserToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => UserToken)
  register(@Args('input') input: AuthRegisterInput): Promise<UserToken> {
    return this.authService.register(input);
  }

  @Mutation((returns) => UserToken)
  login(@Args('input') input: AuthLoginInput): Promise<UserToken> {
    return this.authService.login(input);
  }
}
