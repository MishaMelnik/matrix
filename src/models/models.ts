export interface form {
  id: number;
  columns: number;
  rows: number;
  cell: number;
  amount: number;
  percent: string;
  hover: boolean;
  showPercent: boolean;
}

export interface matrix {
  a: number;
  b: number;
  i: string;
  id: number;
  value: number;
  rowId: number;
  amount: number;
  percent: string;
  acc: number;
}
