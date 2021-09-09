import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
// second argument is a name PassportStrategy. Then, refer to this via a decorator like @UseGuards(AuthGuard('jwt')).
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY
    });
  }

  // provide the verify callback by implementing a validate() method
  async validate(payload: JwtDto) {
    // auto bind data from payload of token after decoded to here
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
