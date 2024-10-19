
interface IPaginator{
    page: number,
    limit: number,
    q: string
}
export interface IInitialPortofolio  {
    paginator: IPaginator
}

export type ActionMapDefaultReducer = {
    set_paginator: IPaginator
  };