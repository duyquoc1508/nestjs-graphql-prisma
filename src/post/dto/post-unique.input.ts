import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostUniqueInput {
  @Field()
  readonly id: string;
}
