import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly firstName?: string;

  @Field({ nullable: true })
  readonly lastName?: string;
}
