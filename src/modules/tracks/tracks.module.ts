import { Module } from '@nestjs/common';
import { ResolverService } from 'src/shared/resolver.service';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { UsersModule } from '../users/users.module';
import { TracksResolver } from './resolver/tracks.resolver';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    TracksModule,
  ],
  providers: [TracksService, TracksResolver, ResolverService],
  exports: [TracksService],
})
export class TracksModule {}
