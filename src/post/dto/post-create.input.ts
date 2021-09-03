import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  readonly title: string;

  @Field()
  readonly content: string;
}
