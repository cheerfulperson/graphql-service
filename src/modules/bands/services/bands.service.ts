import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { BandInput, Bands } from 'src/graphql.schema';
import { QueryParams } from 'src/interfaces/query-params.model';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class BandsService {
  private client: AxiosInstance;
  private token: string;

  constructor(private userService: UsersService) {
    this.client = axios.create({
      baseURL: process.env.BASIC_BANDS_URL,
    });
    this.userService.tokenChanged.subscribe((token) => {
      this.token = token;
    });
  }

  public async finedOneBand(id: string): Promise<BandInput> {
    const request = await this.client.get(`/${id}`);
    return request.data as BandInput;
  }

  public async finedAllBands(limit?: number, offset?: number): Promise<Bands> {
    const params: QueryParams = {};
    if (limit) {
      params.limit = limit;
    }
    if (offset) {
      params.offset = offset;
    }
    const req = await this.client.get('', { params });
    return req.data as Bands;
  }

  public async createOneBand(band: BandInput): Promise<BandInput> {
    try {
      const res = await this.client.post('', band, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateOneBand(id: string, band: BandInput): Promise<BandInput> {
    try {
      const res = await this.client.put(`/${id}`, band, {
        headers: { Authorization: this.token },
      });
      return res.data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteOneBand(id: string): Promise<void> {
    this.client.delete(`/${id}`, {
      headers: { Authorization: this.token },
    });
  }
}
