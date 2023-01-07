export interface Entry {
  id: number;
  date: Date;
  close: number;
  firstDayVar: number | undefined;
  prevDayVar: number | undefined;
}
