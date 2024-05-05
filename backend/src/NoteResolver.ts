


import { 
    Ctx, 
    Field, 
    FieldResolver, 
    InputType, 
    Resolver, 
    Arg, 
    Query, 
    Mutation,
    Int
 } from 'type-graphql';
 
import { Context } from './context'
import { Note } from './Note';
import { title } from 'process';

@InputType()
export class NoteCreateInput {
    @Field()
    title: string;

    @Field({ nullable: true })
    content: string;
}

@Resolver(Note)
export class NoteResolver {

    @Query((returns) => Note, { nullable: true })
    getNoteById(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
        return ctx.prisma.note.findUnique({
            where: { id }
        })
    }

    @Query((returns) => [Note], { nullable: true })
    getAllNotes(@Ctx() ctx: Context) {
        return ctx.prisma.note.findMany()
    }

    @Mutation((returns) => Note)
    createNote(@Arg('title') title: string, @Ctx() ctx: Context) {
        return ctx.prisma.note.create({
            data: {
                title: title,
            }
        })
    }

    @Mutation((returns) => Note)
    updateNote(@Arg('id', (type) => Int) id: number, @Arg('data') data: NoteCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.note.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                content: data.content
            }
        })
    }

    @Mutation((returns) => Note)
    deleteNote(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
        return ctx.prisma.note.delete({
            where: {
                id: id
            }
        })
    }
}
