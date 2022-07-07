import { UseGuards } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArtistInput } from 'src/graphql.schema';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { ResolverService } from 'src/shared/resolver.service';
import { ArtistsService } from '../services/artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private albumsService: ArtistsService,
    private bandsService: BandsService,
    private resolverService: ResolverService,
  ) {}

  @Query()
  async artist(@Args('id') id: string) {
    return this.albumsService.finedOneArtist(id);
  }

  @Query()
  async artists(
    @Args('limit') limit?: number,
    @Args('offset') offset?: number,
  ) {
    return this.albumsService.finedAllArtists(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() artist: ArtistInput) {
    return this.resolverService.resolveField(artist.bandsIds, (id) =>
      this.bandsService.finedOneBand(id),
    );
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createArtist(@Args('input') artist: ArtistInput) {
    return this.albumsService.createOneArtist(artist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateArtist(
    @Args('id') id: string,
    @Args('input') updatedArtist: ArtistInput,
  ) {
    return this.albumsService.updateOneArtist(id, updatedArtist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteArtist(@Args('id') id: string) {
    return this.albumsService.deleteOneArtist(id);
  }
}
