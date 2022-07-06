import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { BandsResolver } from './resolvers/bands.resolver';
import { BandsService } from './services/bands.service';

@Module({
  imports: [UsersModule],
  providers: [BandsService, BandsResolver],
  exports: [BandsService],
})
export class BandsModule {}
