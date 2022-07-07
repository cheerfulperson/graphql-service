import { Module } from '@nestjs/common';
import { UsersResolver } from './resolver/users.resolver';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
