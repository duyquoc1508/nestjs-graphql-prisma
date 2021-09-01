import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly type?: string;
}
