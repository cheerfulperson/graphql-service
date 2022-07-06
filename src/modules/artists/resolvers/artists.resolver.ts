import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArtistInput } from 'src/graphql.schema';
import { ArtistsService } from '../services/artists.service';

@Resolver('Album')
export class ArtistsResolver {
  constructor(private albumsService: ArtistsService) {}

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

  @Mutation()
  @UseGuards(AuthGuard)
  async createArtist(@Args('input') artist: ArtistInput) {
    return this.albumsService.createOneArtist(artist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateAlbum(
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
