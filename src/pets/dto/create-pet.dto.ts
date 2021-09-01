import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field()
  readonly name: string;

  @Field()
  readonly type?: string;
}
