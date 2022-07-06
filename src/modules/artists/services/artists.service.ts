import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ArtistInput, Artists } from 'src/graphql.schema';
import { QueryParams } from 'src/interfaces/query-params.model';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class ArtistsService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_ARTISTS_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedOneArtist(id: string): Promise<ArtistInput> {
    const request = await this.client.get(`/${id}`);
    if (!request.data) {
      throw new NotFoundException();
    }
    return request.data as ArtistInput;
  }

  public async finedAllArtists(
    limit?: number,
    offset?: number,
  ): Promise<Artists> {
    const params: QueryParams = {};
    if (limit) {
      params.limit = limit;
    }
    if (offset) {
      params.offset = offset;
    }
    const req = await this.client.get('', { params });
    return req.data as Artists;
  }

  public async createOneArtist(artist: ArtistInput): Promise<ArtistInput> {
    try {
      const res = await this.client.post('', artist, {
        headers: { Authorization: this.token },
      });
      return res.data as ArtistInput;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateOneArtist(
    id: string,
    artist: ArtistInput,
  ): Promise<ArtistInput> {
    try {
      const res = await this.client.put(`/${id}`, artist, {
        headers: { Authorization: this.token },
      });
      return res.data as ArtistInput;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteOneArtist(id: string): Promise<void> {
    await this.client.delete(`/${id}`, {
      headers: { Authorization: this.token },
    });
  }
}
