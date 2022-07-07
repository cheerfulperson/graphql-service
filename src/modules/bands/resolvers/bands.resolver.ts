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
import { BandInput } from 'src/graphql.schema';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { BandsService } from '../services/bands.service';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private bandsService: BandsService,
    private genresSerives: GenresService,
  ) {}

  @Query()
  async band(@Args('id') id: string) {
    return this.bandsService.finedOneBand(id);
  }

  @Query()
  async bands(@Args('limit') limit?: number, @Args('offset') offset?: number) {
    return this.bandsService.finedAllBands(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() band: BandInput) {
    const { genresIds } = band;
    const genres = await Promise.allSettled(
      genresIds.map((id) => {
        return this.genresSerives.finedOneGenre(id);
      }),
    );
    return genres
      .filter((genre) => genre.status === 'fulfilled' && genre.value)
      .map((genre) => (genre.status === 'fulfilled' ? genre.value : {}));
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createBand(@Args('input') artist: BandInput) {
    return this.bandsService.createOneBand(artist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateBand(
    @Args('id') id: string,
    @Args('input') updatedArtist: BandInput,
  ) {
    return this.bandsService.updateOneBand(id, updatedArtist);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteBand(@Args('id') id: string) {
    return this.bandsService.deleteOneBand(id);
  }
}
