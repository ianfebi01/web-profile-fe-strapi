import { IApi, IApiPagination } from "../api";
import { IApiPosition } from "../api/position";

interface IPaginator{
    page: number,
    limit: number,
    q: string
}
export interface IInitialPosition  {
    paginator: IPaginator
}

// type SET_PAGE = {
//     page?: string;
//   };

export type ActionMapDefaultReducer = {
    push_data: IApiPosition 
    set_data: IApi<IApiPosition[]> & IApiPagination
    set_paginator: IPaginator
  };