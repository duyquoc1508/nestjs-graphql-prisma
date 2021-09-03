import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateInput } from './dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
