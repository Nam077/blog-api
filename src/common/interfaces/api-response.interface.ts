interface BaseApiResponse {
    status: number;
    message: string;
}

interface SingleDataResponse<ENTITY> extends BaseApiResponse {
    data: ENTITY;
}
interface ErrorDataResponse extends BaseApiResponse {
    data: null;
}
interface MultipleDataResponse<ENTITY> extends BaseApiResponse {
    datas: ENTITY[];
}

interface PaginationDataResponse<ENTITY> extends BaseApiResponse {
    page: number;
    items: ENTITY[];
    limit: number;
    total: number;
    totalPages: number;
    prevPage?: number;
    nextPage?: number;
}
export type APIResponseData<ENTITY> =
    | SingleDataResponse<ENTITY>
    | MultipleDataResponse<ENTITY>
    | PaginationDataResponse<ENTITY>
    | ErrorDataResponse;
