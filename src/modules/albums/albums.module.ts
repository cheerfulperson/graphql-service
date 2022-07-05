import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AlbumsResolver } from './resolvers/album.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [UsersModule],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService],
})
export class AlbumsModule {}
