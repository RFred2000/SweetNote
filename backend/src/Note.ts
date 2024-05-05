import "core-js/features/reflect";
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Note {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

}