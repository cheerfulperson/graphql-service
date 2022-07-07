import { Module } from '@nestjs/common';
import { ResolverService } from 'src/shared/resolver.service';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { TracksService } from '../tracks/services/tracks.service';
import { UsersModule } from '../users/users.module';
import { AlbumsResolver } from './resolvers/album.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [UsersModule, ArtistsModule, BandsModule, GenresModule],
  providers: [AlbumsService, AlbumsResolver, ResolverService, TracksService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
