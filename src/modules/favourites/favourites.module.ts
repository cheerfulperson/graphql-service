import { Module } from '@nestjs/common';
import { ResolverService } from 'src/shared/resolver.service';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { TracksModule } from '../tracks/tracks.module';
import { UsersService } from '../users/services/users.service';
import { FavouritesResolver } from './resolver/favourites.resolver';
import { FavouritesService } from './services/favourites.service';

@Module({
  imports: [ArtistsModule, GenresModule, TracksModule, BandsModule],
  providers: [
    FavouritesService,
    FavouritesResolver,
    ResolverService,
    UsersService,
  ],
  exports: [FavouritesService],
})
export class FavouritesModule {}
