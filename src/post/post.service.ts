import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateInput } from './dto';
import { Post } from './models/post';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: PostCreateInput, authorId: string): Promise<Post> {
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

  findMany(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }
}
