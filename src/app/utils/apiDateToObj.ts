export function apiDateToObj(apiDate: string): Date {
  const [month, day, year] = apiDate.split('-').map((num: string) => +num);
  return new Date(year, month, day);
}
