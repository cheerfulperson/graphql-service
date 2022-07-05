import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Subject } from 'rxjs';
import { User } from 'src/graphql.schema';

@Injectable()
export class UsersService {
  private client: AxiosInstance;
  private tokenSubject = new Subject<string>();

  public tokenChanged = this.tokenSubject.asObservable();

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASIC_USERS_URL,
    });
  }

  public async verify(token: string): Promise<User> {
    const req = await this.client.post(
      '/verify',
      {},
      {
        headers: { Authorization: token },
      },
    );
    if (req.data) {
      this.tokenSubject.next(token);
    }
    return req.data as User;
  }
}
