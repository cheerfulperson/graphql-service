import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { FavouritesInput } from 'src/graphql.schema';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { ResolverService } from 'src/shared/resolver.service';
import { FavouritesService } from '../services/favourites.service';

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private genresService: GenresService,
    private trackesService: TracksService,
    private resolverService: ResolverService,
  ) {}

  @Query()
  @UseGuards(AuthGuard)
  async favourites() {
    return this.favouritesService.finedAll();
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() fav: FavouritesInput) {
    return this.resolverService.resolveField(fav.artistsIds, (id) =>
      this.artistsService.finedOneArtist(id),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() fav: FavouritesInput) {
    return this.resolverService.resolveField(fav.bandsIds, (id) =>
      this.bandsService.finedOneBand(id),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() fav: FavouritesInput) {
    return this.resolverService.resolveField(fav.genresIds, (id) =>
      this.genresService.finedOneGenre(id),
    );
  }

  @Resolver()
  @ResolveField()
  async tracks(@Parent() fav: FavouritesInput) {
    return this.resolverService.resolveField(fav.tracksIds, (id) =>
      this.trackesService.finedOneTrack(id),
    );
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addTrackToFavourites(@Args('id') id: string) {
    return this.favouritesService.addOneTrackToFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addBandToFavourites(@Args('id') id: string) {
    return this.favouritesService.addOneBandToFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addArtistToFavourites(@Args('id') id: string) {
    return this.favouritesService.addOneArtistToFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addGenreToFavourites(@Args('id') id: string) {
    return this.favouritesService.addOneGenreToFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeTrackFromFavourites(@Args('id') id: string) {
    return this.favouritesService.removeOneTrackFromFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeBandFromFavourites(@Args('id') id: string) {
    return this.favouritesService.removeOneBandFromFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeArtistFromFavourites(@Args('id') id: string) {
    return this.favouritesService.removeOneArtistFromFavourites(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeGenreFromFavourites(@Args('id') id: string) {
    return this.favouritesService.removeOneGenreFromFavourites(id);
  }
}
