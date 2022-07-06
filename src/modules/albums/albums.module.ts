import { Module } from '@nestjs/common';
import { ResolverService } from 'src/shared/resolver.service';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { TracksModule } from '../tracks/tracks.module';
import { UsersModule } from '../users/users.module';
import { AlbumsResolver } from './resolvers/album.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    TracksModule,
  ],
  providers: [AlbumsService, AlbumsResolver, ResolverService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
