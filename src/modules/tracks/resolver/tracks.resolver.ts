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
import { TrackInput } from 'src/graphql.schema';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { ResolverService } from 'src/shared/resolver.service';
import { TracksService } from '../services/tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private genresService: GenresService,
    private resolverService: ResolverService,
  ) {}

  @Query()
  async track(@Args('id') id: string) {
    return this.tracksService.finedOneTrack(id);
  }

  @Query()
  async tracks(@Args('limit') limit?: number, @Args('offset') offset?: number) {
    return this.tracksService.finedAllTracks(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() track: TrackInput) {
    return this.resolverService.resolveField(track.artistsIds, (id) =>
      this.artistsService.finedOneArtist(id),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() track: TrackInput) {
    return this.resolverService.resolveField(track.bandsIds, (id) =>
      this.bandsService.finedOneBand(id),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() track: TrackInput) {
    return this.resolverService.resolveField(track.genresIds, (id) =>
      this.genresService.finedOneGenre(id),
    );
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createTrack(@Args('input') track: TrackInput) {
    return this.tracksService.createOneTrack(track);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateTrack(@Args('id') id: string, @Args('input') track: TrackInput) {
    return this.tracksService.updateOneTrack(id, track);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteTrack(@Args('id') id: string) {
    return this.tracksService.deleteOneTrack(id);
  }
}
