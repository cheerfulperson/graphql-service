import { Injectable } from '@nestjs/common';

@Injectable()
export class ResolverService {
  public async resolveField<T>(
    ids: string[],
    cb: (id: string) => Promise<T>,
  ): Promise<T[]> {
    const entitys = (await Promise.allSettled(
      ids.map((id) => {
        return cb(id);
      }),
    )) as PromiseSettledResult<T>[];
    return entitys
      .filter((entity) => entity.status === 'fulfilled' && entity.value)
      .map<T>((entity) => (entity.status === 'fulfilled' ? entity.value : null))
      .filter((entity) => Boolean(entity));
  }
}
