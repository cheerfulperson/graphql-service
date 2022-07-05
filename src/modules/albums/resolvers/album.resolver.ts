import { Args, Resolver, Query } from '@nestjs/graphql';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(private albumsService: AlbumsService) {}

  @Query()
  async album(@Args('id') id: string) {
    return this.albumsService.finedOneAlbum(id);
  }
}
