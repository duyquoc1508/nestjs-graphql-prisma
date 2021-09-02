import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  readonly email: string;

  @Field()
  readonly name: string;
}
