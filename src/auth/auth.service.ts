import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthHelper } from './auth.helper';
import { AuthLoginInput, AuthRegisterInput } from './dto';
import { JwtDto } from './dto/jwt.dto';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(userId: string) {
    // if not found. prisma return null
    return this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    });
  }

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
    const { password, ...result } = user;
    return {
      accessToken: this.signToken({ userId: user.id }),
      user: result
    };
  }

  private signToken(payload: JwtDto): string {
    return this.jwtService.sign(payload);
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
    const { password, ...result } = created;
    return {
      accessToken: this.signToken({ userId: created.id }),
      user: result
    };
  }
}
