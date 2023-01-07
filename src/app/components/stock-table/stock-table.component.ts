import { Component, Input } from '@angular/core';
import { Entry, Item, Items, StockData } from 'src/app/interfaces';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
})
export class StockTableComponent {
  public entries: Entry[] = [];

  @Input() stockData: StockData | undefined;
  @Input() days: number = 30;

  ngOnInit() {
    const stockItems: Items | undefined = this.stockData?.items;
    if (!stockItems) {
      return;
    }

    const itemKeys = Object.keys(stockItems);
    itemKeys.sort();

    const lastEntries = itemKeys.slice(-this.days);
    const firstEntry = stockItems[lastEntries[0]];
    let prevEntry: Entry | undefined;

    this.entries = lastEntries.reduce(
      (items: Entry[], itemKey: string, index: number) => {
        const { close, date_utc } = stockItems[itemKey];
        const prevDayClose = prevEntry?.close;

        const firstDayVar =
          index > 0 ? this.getDiff(firstEntry.close, close) : undefined;

        const prevDayVar = prevDayClose
          ? this.getDiff(prevDayClose, close)
          : undefined;

        const entry: Entry = {
          id: index + 1,
          date_utc,
          close,
          firstDayVar,
          prevDayVar,
        };

        prevEntry = entry;
        return items.concat(entry);
      },
      []
    );
  }

  getDiff(basePrice: number, compPrice: number): number {
    return ((compPrice * 100) / basePrice - 100) / 100;
  }
}
