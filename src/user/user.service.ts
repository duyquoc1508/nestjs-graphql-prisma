import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreateInput, UserUpdateInput, UserUniqueInput } from './dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  create(data: UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data
    });
  }

  findUnique(where: UserUniqueInput): Promise<User> {
    return this.prismaService.user.findUnique({ where });
  }

  findMany(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  update(where: UserUniqueInput, data: UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: where.id
      },
      data
    });
  }
}
