import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Favourites, FavouritesInput } from 'src/graphql.schema';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class FavouritesService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_FAVOURITES_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedAll(): Promise<Favourites> {
    try {
      const res = await this.client.get('', {
        headers: { Authorization: this.token },
      });
      if (!res.data) {
        throw new Error('Not Found');
      }
      return res.data as Favourites;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Not Found') {
        throw new NotFoundException();
      }

      if (error instanceof AxiosError) {
        if (error.response.status === 403) {
          throw new ForbiddenException();
        }
      }
      throw new InternalServerErrorException();
    }
  }

  public async addOneTrackToFavourites(id: string): Promise<FavouritesInput> {
    return this.addToFavourites('tracks', id);
  }

  public async addOneBandToFavourites(id: string): Promise<FavouritesInput> {
    return this.addToFavourites('bands', id);
  }

  public async addOneArtistToFavourites(id: string): Promise<FavouritesInput> {
    return this.addToFavourites('artists', id);
  }

  public async addOneGenreToFavourites(id: string): Promise<FavouritesInput> {
    return this.addToFavourites('genres', id);
  }

  public async removeOneTrackFromFavourites(
    id: string,
  ): Promise<FavouritesInput> {
    return this.removeFromFavourites('tracks', id);
  }

  public async removeOneBandFromFavourites(
    id: string,
  ): Promise<FavouritesInput> {
    return this.removeFromFavourites('bands', id);
  }

  public async removeOneArtistFromFavourites(
    id: string,
  ): Promise<FavouritesInput> {
    return this.removeFromFavourites('artists', id);
  }

  public async removeOneGenreFromFavourites(
    id: string,
  ): Promise<FavouritesInput> {
    return this.removeFromFavourites('genres', id);
  }

  private async addToFavourites(
    type: string,
    id: string,
  ): Promise<FavouritesInput> {
    try {
      const res = await this.client.put(
        '/add',
        {
          type,
          id,
        },
        {
          headers: { Authorization: this.token },
        },
      );
      if (!res.data) {
        throw new Error('Not Found');
      }
      return res.data as FavouritesInput;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Not Found') {
        throw new NotFoundException();
      }

      if (error instanceof AxiosError) {
        if (error.response.status === 403) {
          throw new ForbiddenException();
        }
      }
      throw new InternalServerErrorException();
    }
  }

  private async removeFromFavourites(
    type: string,
    id: string,
  ): Promise<FavouritesInput> {
    try {
      const res = await this.client.put(
        '/remove',
        {
          type,
          id,
        },
        {
          headers: { Authorization: this.token },
        },
      );
      if (!res.data) {
        throw new Error('Not Found');
      }
      return res.data as FavouritesInput;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Not Found') {
        throw new NotFoundException();
      }

      if (error instanceof AxiosError) {
        if (error.response.status === 403) {
          throw new ForbiddenException();
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
