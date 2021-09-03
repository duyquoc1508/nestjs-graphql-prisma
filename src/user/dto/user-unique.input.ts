import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUniqueInput {
  @Field()
  id: string;
}
