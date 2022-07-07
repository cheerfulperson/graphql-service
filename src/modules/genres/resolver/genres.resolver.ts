import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { GenreInput } from 'src/graphql.schema';
import { GenresService } from '../services/genres.service';

@Resolver('Genre')
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query()
  async genre(@Args('id') id: string) {
    return this.genresService.finedOneGenre(id);
  }

  @Query()
  async genres(@Args('limit') limit?: number, @Args('offset') offset?: number) {
    return this.genresService.finedAllGenres(limit, offset);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createGenre(@Args('input') artist: GenreInput) {
    return this.genresService.createOneGenre(artist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateGenre(
    @Args('id') id: string,
    @Args('input') updatedArtist: GenreInput,
  ) {
    return this.genresService.updateOneGenre(id, updatedArtist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteGenre(@Args('id') id: string) {
    return this.genresService.deleteOneGenre(id);
  }
}
