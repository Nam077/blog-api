export interface PaginationData<ENTITY> {
    page: number;
    items: ENTITY[];
    limit: number;
    total: number;
    totalPages: number;
    prevPage?: number;
    nextPage?: number;
}
