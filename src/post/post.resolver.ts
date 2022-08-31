import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Root } from '@nestjs/graphql';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/models/user';
import { PostCreateInput } from './dto';
import { PostUpdateInput } from './dto/post-update.input';
import { Post } from './models/post';
import { PostService } from './post.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly prismaService: PrismaService
  ) {}

  @Query((returns) => [Post], { name: 'posts' }) // this name is name of query
  posts(): Promise<Post[]> {
    return this.postService.posts();
  }

  @Query((returns) => Post)
  post(@Args('id') id: string): Promise<Post> {
    return this.postService.post(id);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  createPost(@CtxUser() user: User, @Args('data') data: PostCreateInput): Promise<Post> {
    return this.postService.createPost(data, user.id);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @CtxUser() user: User,
    @Args('id') id: string,
    @Args('data') data: PostUpdateInput
  ): Promise<Post> {
    return this.postService.updatePost(user.id, id, data);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  deletePost(@CtxUser() user: User, @Args('id') id: string): Promise<Post> {
    return this.postService.deletePost(user.id, id);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  increasePostViewCount(@Args('id') id: string): Promise<Post> {
    return this.postService.increasePostViewCount(id);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  togglePublishPost(@CtxUser() user: User, @Args('id') id: string): Promise<Post> {
    return this.postService.togglePublishPost(user.id, id);
  }

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
}
