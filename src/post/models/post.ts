import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user';

@ObjectType()
export class Post {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly content: string;

  @Field((type) => Boolean)
  readonly published: boolean;

  @Field((type) => Int)
  readonly viewCount: number;

  @Field((type) => Date)
  readonly createdAt: Date;

  @Field((type) => Date)
  readonly updatedAt: Date;

  // @Field((type) => ID)
  readonly authorId: string;

  @Field((type) => User)
  readonly author?: User;
}
