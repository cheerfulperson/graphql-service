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
import { AlbumInput } from 'src/graphql.schema';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {}

  @Query()
  async album(@Args('id') id: string) {
    return this.albumsService.finedOneAlbum(id);
  }

  @Query()
  async albums(
    @Args('limit') limit?: number,
    @Args('offset') offset?: number,
    @Args('name') name?: string,
  ) {
    return this.albumsService.finedAll(limit, offset, name);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() album: AlbumInput) {
    const { artistsIds } = album;
    const artists = await Promise.allSettled(
      artistsIds.map((id) => {
        return this.artistsService.finedOneArtist(id);
      }),
    );
    return artists
      .filter((artist) => artist.status === 'fulfilled' && artist.value)
      .map((artist) => (artist.status === 'fulfilled' ? artist.value : {}));
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() album: AlbumInput) {
    const { bandsIds } = album;
    const bands = await Promise.allSettled(
      bandsIds.map((id) => {
        return this.bandsService.finedOneBand(id);
      }),
    );
    return bands
      .filter((band) => band.status === 'fulfilled' && band.value)
      .map((band) => (band.status === 'fulfilled' ? band.value : {}));
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createAlbum(@Args('input') albumData: AlbumInput) {
    return this.albumsService.createAlbum(albumData);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateAlbum(
    @Args('id') id: string,
    @Args('input') albumData: AlbumInput,
  ) {
    return this.albumsService.updateAlbum(id, albumData);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteAlbum(@Args('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
