import { FindOneOptions } from 'typeorm';

export interface FindOneOptionCustom<Entity> extends Omit<FindOneOptions<Entity>, 'where'> {}
