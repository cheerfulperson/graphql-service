import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Album, AlbumInput, Albums } from 'src/graphql.schema';
import { QueryParams } from 'src/interfaces/query-params.model';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AlbumsService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_ALBUMS_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedOneAlbum(id: string): Promise<Album> {
    const request = await this.client.get(`/${id}`);
    if (request.status !== 200) {
      throw new NotFoundException();
    }
    return request.data as Album;
  }

  public async finedAll(
    limit?: number,
    offset?: number,
    name?: string,
  ): Promise<Albums> {
    const params: QueryParams = {};
    if (limit) {
      params.limit = limit;
    }
    if (offset) {
      params.offset = offset;
    }
    if (name) {
      params.name = name;
    }
    const req = await this.client.get('', { params });
    return req.data as Albums;
  }

  public async createAlbum(album: AlbumInput): Promise<Album> {
    if (!this.token) {
      throw new ForbiddenException();
    }
    try {
      const res = await this.client.post('', album, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateAlbum(id: string, album: AlbumInput): Promise<Album> {
    if (!this.token) {
      throw new ForbiddenException();
    }
    try {
      const res = await this.client.put(`/${id}`, album, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteAlbum(id: string): Promise<void> {
    this.client.delete(`/${id}`, {
      headers: { Authorization: this.token },
    });
  }
}
