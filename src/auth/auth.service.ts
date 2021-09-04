import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthHelper } from './auth.helper';
import { AuthLoginInput, AuthRegisterInput } from './dto';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(input: AuthLoginInput): Promise<UserToken> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: input.email
      }
    });
    if (!user) {
      throw new NotFoundException(`User with email ${input.email} does not exists.`);
    }
    const passwordValid = await AuthHelper.validate(input.password, user.password);

    if (!passwordValid) {
      throw new Error('Invalid password');
    }
    return {
      accessToken: this.signToken(user.id),
      user
    };
  }

  private signToken(id: string): string {
    return 'temp token';
  }

  async register(input: AuthRegisterInput): Promise<UserToken> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: input.email
      }
    });
    if (user) {
      throw new BadRequestException(`Email ${input.email} already have been account`);
    }
    const hashPassword = await AuthHelper.hash(input.password);
    const created = await this.prismaService.user.create({
      data: {
        ...input,
        password: hashPassword
      }
    });
    return {
      accessToken: this.signToken(created.id),
      user: created
    };
  }
}
