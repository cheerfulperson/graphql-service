import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { TrackInput, Tracks } from 'src/graphql.schema';
import { QueryParams } from 'src/interfaces/query-params.model';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class TracksService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_TRACKS_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedOneTrack(id: string): Promise<TrackInput> {
    const request = await this.client.get(`/${id}`);
    if (!request.data || !id) {
      throw new NotFoundException();
    }
    return request.data as TrackInput;
  }

  public async finedAllTracks(
    limit?: number,
    offset?: number,
  ): Promise<Tracks> {
    const params: QueryParams = {};
    if (limit) {
      params.limit = limit;
    }
    if (offset) {
      params.offset = offset;
    }
    const req = await this.client.get('', { params });
    return req.data as Tracks;
  }

  public async createOneTrack(band: TrackInput): Promise<TrackInput> {
    try {
      const res = await this.client.post('', band, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateOneTrack(
    id: string,
    band: TrackInput,
  ): Promise<TrackInput> {
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

  public async deleteOneTrack(id: string): Promise<void> {
    this.client.delete(`/${id}`, {
      headers: { Authorization: this.token },
    });
  }
}
