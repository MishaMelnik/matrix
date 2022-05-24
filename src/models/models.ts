export interface Data {
  id: number;
  columns: number;
  rows: number;
  cells: number;
  length: number;
  newMatrix: object;
}
export interface reduce {
  acc: number;
  num: number;
}
export interface matrix {
  table: any;
  average: any;
  amountClick: any;
  removeRow: any;
  hoverAmount: any;
  endHoverAmount: any;
  showPercent: any;
  endShowPercent: any;
}
