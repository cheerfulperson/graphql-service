import { Module } from '@nestjs/common';
import { ResolverService } from 'src/shared/resolver.service';
import { BandsService } from '../bands/services/bands.service';
import { UsersModule } from '../users/users.module';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';

@Module({
  imports: [UsersModule],
  providers: [ArtistsService, ArtistsResolver, ResolverService, BandsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
