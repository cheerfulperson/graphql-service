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
import { Band, BandInput } from 'src/graphql.schema';
import { BandsService } from '../services/bands.service';

@Resolver('Album')
export class BandsResolver {
  constructor(private bandsService: BandsService) {}

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
  async genres(@Parent() band: Band) {
    return [];
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
