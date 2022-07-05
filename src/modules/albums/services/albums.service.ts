import { Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Album } from 'src/graphql.schema';

@Injectable()
export class AlbumsService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASIC_ALBUMS_URL,
    });
  }

  public async finedOneAlbum(id: string): Promise<Album> {
    const request = await this.client.get(`/albums/${id}`);
    if (request.status !== 200) {
      throw new NotFoundException();
    }
    return request.data as Album;
  }
}
