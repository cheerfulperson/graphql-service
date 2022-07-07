import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Subject } from 'rxjs';
import { Jwt, LoginUserInput, User, UserInput } from 'src/graphql.schema';

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

  public async finedOneUser(id: string): Promise<User> {
    try {
      const res = await this.client.get(`/${id}`);
      return res.data as User;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async login(loginInfo: LoginUserInput): Promise<Jwt> {
    try {
      const res = await this.client.post(`/login`, loginInfo);
      if (!res.data) {
        throw new Error('Not Found');
      }
      return res.data as Jwt;
    } catch (error) {
      if (error.message === 'Not Found') {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }

  public async register(regInfo: UserInput): Promise<User> {
    try {
      const res = await this.client.post('/register', regInfo);
      return res.data as User;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async verify(token: string): Promise<User> {
    const req = await this.client.post(
      '/verify',
      {},
      {
        headers: { Authorization: token },
      },
    );
    if (!req.data) {
      throw new ForbiddenException();
    }
    this.tokenSubject.next(token);
    return req.data as User;
  }
}
