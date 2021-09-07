import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/role/enum/role.enum';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly email: string;

  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  // @Field() => not expose password
  readonly password?: string;

  // @Field()
  // readonly posts : Post;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;

  roles?: Role[];
}
