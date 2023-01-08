interface DateString {
  day: string;
  month: string;
  year: string;
}

export function getDateFromObj(dateObj: Date): DateString {
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString().slice(0, 2);

  return { day, month, year };
}
