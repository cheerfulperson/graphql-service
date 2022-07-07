import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { GenreInput, Genres } from 'src/graphql.schema';
import { QueryParams } from 'src/interfaces/query-params.model';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class GenresService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_GENRES_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedOneGenre(id: string): Promise<GenreInput> {
    const request = await this.client.get(`/${id}`);
    return request.data as GenreInput;
  }

  public async finedAllGenres(
    limit?: number,
    offset?: number,
  ): Promise<Genres> {
    const params: QueryParams = {};
    if (limit) {
      params.limit = limit;
    }
    if (offset) {
      params.offset = offset;
    }
    const req = await this.client.get('', { params });
    return req.data as Genres;
  }

  public async createOneGenre(band: GenreInput): Promise<GenreInput> {
    try {
      const res = await this.client.post('', band, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateOneGenre(
    id: string,
    band: GenreInput,
  ): Promise<GenreInput> {
    try {
      const res = await this.client.put(`/${id}`, band, {
        headers: { Authorization: this.token },
      });
      if (!res.data) {
        throw new Error('Not Found');
      }
      return res.data;
    } catch (error) {
      if (error.message === 'Not Found') {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }

  public async deleteOneGenre(id: string): Promise<void> {
    this.client.delete(`/${id}`, {
      headers: { Authorization: this.token },
    });
  }
}
