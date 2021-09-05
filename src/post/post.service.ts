import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateInput } from './dto';
import { PostUpdateInput } from './dto/post-update.input';
import { Post } from './models/post';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(data: PostCreateInput, authorId: string): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { id: authorId }
        }
      }
    });
  }

  // find one post
  post(id: string): Promise<Post> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  posts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async updatePost(userId: string, id: string, data: PostUpdateInput): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You dont have permission to update this post');
    }

    return this.prismaService.post.update({
      where: {
        id
      },
      data: data
    });
  }

  async deletePost(userId: string, id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id
      }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.authorId !== userId) {
      throw new ForbiddenException(`You dont have permission delete this post`);
    }
    return this.prismaService.post.delete({
      where: {
        id
      }
    });
  }
}
