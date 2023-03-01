import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInput, UserInput } from 'src/graphql.schema';
import { UsersService } from '../services/users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  async user(@Args('id') id: string) {
    return this.usersService.finedOneUser(id);
  }

  @Query()
  async jwt(@Args('input') loginInput: LoginUserInput) {
    return this.usersService.login(loginInput);
  }

  @Mutation()
  async register(@Args('input') regInfo: UserInput) {
    return this.usersService.register(regInfo);
  }
}
