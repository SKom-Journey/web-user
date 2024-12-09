export interface IResponse<T> {
    data: T;
    status: string;
    error: null | string | boolean;
}