import { Module } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { UsersModule } from '../users/users.module';
import { AlbumsResolver } from './resolvers/album.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [UsersModule, ArtistsModule, BandsModule],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService],
})
export class AlbumsModule {}
