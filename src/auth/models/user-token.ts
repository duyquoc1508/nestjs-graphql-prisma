import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user';

@ObjectType()
export class UserToken {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
