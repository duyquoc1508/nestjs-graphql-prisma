import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserUpdateInput, UserUniqueInput } from './dto';
import { User } from './models/user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
