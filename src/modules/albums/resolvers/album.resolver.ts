import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { AlbumInput } from 'src/graphql.schema';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(private albumsService: AlbumsService) {}

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
