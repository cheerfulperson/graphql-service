import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ClientRequest } from 'http';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const clientRequest = (context.getArgs() as unknown[])[2] as ClientRequest;
    const request = clientRequest.req;
    const authorizationToken: string =
      request.headers['authorization'] ||
      (request.headers['Authorization'] as string);
    try {
      const user = await this.userService.verify(authorizationToken);
      if (!user) {
        throw new Error('Forbidden resource');
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
