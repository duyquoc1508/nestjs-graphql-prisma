import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostUpdateInput {
  @Field({ nullable: true })
  readonly title?: string;

  @Field({ nullable: true })
  readonly content?: string;
}
