import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  readonly email: string;

  @Field()
  readonly name: string;
}
