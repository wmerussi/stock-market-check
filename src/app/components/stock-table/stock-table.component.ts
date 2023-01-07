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

    const itemKeys = Object.values(stockItems);
    itemKeys.sort((a: Item, b: Item) => a.date_utc - b.date_utc);

    const lastEntries = itemKeys.slice(-this.days);
    const firstEntry = lastEntries[0];

    this.entries = lastEntries.reduce(
      (items: Entry[], item: Item, index: number) => {
        const { close, date_utc } = item;

        const prevDayClose =
          index > 0 ? lastEntries[index - 1]?.close : undefined;

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

        return items.concat(entry);
      },
      []
    );
  }

  getDiff(basePrice: number, compPrice: number): number {
    return ((compPrice * 100) / basePrice - 100) / 100;
  }
}
