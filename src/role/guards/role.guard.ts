import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true; // if not exists ROLES_KEY => FORBIDDEN
    }
    /** for graphql */
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    /** for rest api */
    // const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.include(role));
  }
}
