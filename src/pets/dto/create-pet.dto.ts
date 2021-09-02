import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, MaxLength } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field()
  @IsAlpha()
  @MaxLength(10)
  readonly name: string;

  @Field()
  @IsAlphanumeric()
  @MaxLength(20, {
    message: 'Type is too long'
  })
  readonly type?: string;
}
