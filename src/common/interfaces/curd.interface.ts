/* eslint-disable @typescript-eslint/method-signature-style */
import { FindOneOptionCustom } from './find-one.interface';

export interface CrudInterface<ENTITY, CREATE_DTO, UPDATE_DTO, FIND_ALL_DTO, PAGINATION_DATA, API_RESPONSE, USER_AUTH> {
    findOneEntity(id: string, options?: FindOneOptionCustom<ENTITY>, withDeleted?: boolean): Promise<ENTITY>;
    findOne(id: string, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    findAllEntity(findAllDto: FIND_ALL_DTO, withDeleted?: boolean): Promise<PAGINATION_DATA>;
    findAll(findAllDto: FIND_ALL_DTO, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    createEntity(createDto: CREATE_DTO): Promise<ENTITY>;
    create(createDto: CREATE_DTO, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    updateEntity(id: string, updateDto: UPDATE_DTO): Promise<ENTITY>;
    update(id: string, updateDto: UPDATE_DTO, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    deleteEntity(id: string): Promise<ENTITY>;
    delete(id: string, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    restoreEntity(id: string): Promise<ENTITY>;
    restore(id: string, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    softDeleteEntity(id: string): Promise<ENTITY>;
    softDelete(id: string, currentUser: USER_AUTH): Promise<API_RESPONSE>;

    findOneOrFail(id: string, options?: FindOneOptionCustom<ENTITY>, withDeleted?: boolean): Promise<ENTITY>;
}
