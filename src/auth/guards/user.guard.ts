import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from '../../user/user-role.enum';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const user: User = context.switchToHttp().getRequest().user;

    return user.role === UserRole.USER;
  }
}
