import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field()
  readonly email: string;

  @Field()
  readonly name: string;
}
