import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  createUser(data: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
