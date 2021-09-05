import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserUpdateInput, UserUniqueInput } from './dto';
import { User } from './models/user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public getUserInfo(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  updateUser(id: string, data: UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data
    });
  }
}
