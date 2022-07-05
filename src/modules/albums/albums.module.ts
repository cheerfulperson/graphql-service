import { Module } from '@nestjs/common';
import { AlbumsResolver } from './resolvers/album.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService],
})
export class AlbumsModule {}
