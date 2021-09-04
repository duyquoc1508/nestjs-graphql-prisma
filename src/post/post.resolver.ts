import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Root
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/models/user';
import { PostCreateInput } from './dto';
import { Post } from './models/post';
import { PostService } from './post.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly prismaService: PrismaService
  ) {}

  // use UserService or PrismaService directly
  @ResolveField((returns) => User)
  author(@Root() post: Post): Promise<User> {
    return this.prismaService.post
      .findUnique({
        where: {
          id: post.id
        }
      })
      .author();
  }

  @Mutation((returns) => Post)
  createOnePost(
    @Args('data') data: PostCreateInput,
    @Args('authorId') authorId: string
  ): Promise<Post> {
    return this.postService.create(data, authorId);
  }

  @Query((returns) => [Post], { name: 'post' })
  posts(): Promise<Post[]> {
    return this.postService.findMany();
  }
}
