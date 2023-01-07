export interface Entry {
  id: number;
  date_utc: number;
  close: number;
  firstDayVar: number | undefined;
  prevDayVar: number | undefined;
}
