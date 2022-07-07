import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { GenresResolver } from './resolver/genres.resolver';
import { GenresService } from './services/genres.service';

@Module({
  imports: [UsersModule],
  providers: [GenresService, GenresResolver],
  exports: [GenresService],
})
export class GenresModule {}
