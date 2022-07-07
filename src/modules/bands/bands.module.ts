import { Module } from '@nestjs/common';
import { GenresModule } from '../genres/genres.module';
import { UsersModule } from '../users/users.module';
import { BandsResolver } from './resolvers/bands.resolver';
import { BandsService } from './services/bands.service';

@Module({
  imports: [UsersModule, GenresModule],
  providers: [BandsService, BandsResolver],
  exports: [BandsService],
})
export class BandsModule {}
