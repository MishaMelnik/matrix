export interface initialStore {
  table: Array<Array<object>>;
}
export interface storeReducer {
  type: string;
  table: Array<Array<object>>;
}
export interface matrix {
  id: number;
  amount: number;
  percent: string;
  columns: number;
  cell: number;
}
