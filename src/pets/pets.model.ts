import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
