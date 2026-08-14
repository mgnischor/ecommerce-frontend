import { HttpResponse } from '@angular/common/http';

export interface Paged<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export function parsePagedResponse<T>(
    response: HttpResponse<T[]>,
    defaultPage = 1,
    defaultSize = 10,
): Paged<T> {
    const body = response.body ?? [];
    const totalCount = Number(response.headers.get('X-Total-Count') ?? body.length);
    const pageNumber = Number(response.headers.get('X-Page-Number') ?? defaultPage);
    const pageSize = Number(response.headers.get('X-Page-Size') ?? defaultSize);
    const totalPages = Number(
        response.headers.get('X-Total-Pages') ??
            (pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0),
    );

    return { items: body, totalCount, pageNumber, pageSize, totalPages };
}
