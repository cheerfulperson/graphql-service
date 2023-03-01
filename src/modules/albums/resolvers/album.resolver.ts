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
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { ResolverService } from 'src/shared/resolver.service';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private genresService: GenresService,
    private trackesService: TracksService,
    private resolverService: ResolverService,
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
    return this.resolverService.resolveField(album.artistsIds, (id) =>
      this.artistsService.finedOneArtist(id),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() album: AlbumInput) {
    return this.resolverService.resolveField(album.bandsIds, (id) =>
      this.bandsService.finedOneBand(id),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() album: AlbumInput) {
    return this.resolverService.resolveField(album.genresIds, (id) =>
      this.genresService.finedOneGenre(id),
    );
  }

  @Resolver()
  @ResolveField()
  async tracks(@Parent() album: AlbumInput) {
    return this.resolverService.resolveField(album.trackIds, (id) =>
      this.trackesService.finedOneTrack(id),
    );
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
