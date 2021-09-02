import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly email: string;

  @Field()
  readonly name: string;

  // @Field()
  // readonly posts : Post;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;
}
