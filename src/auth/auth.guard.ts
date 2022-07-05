import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context['args'][2].req;
    const authorizationToken: string =
      request.headers['authorization'] || request.headers['Authorization'];
    try {
      const user = await this.userService.verify(authorizationToken);
      request.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}
