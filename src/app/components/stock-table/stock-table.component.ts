import { Component, Input } from '@angular/core';
import { Entry, Item, Items, StockData } from 'src/app/interfaces';
import { getPriceDiff } from 'src/app/utils';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
})
export class StockTableComponent {
  public entries: Entry[] = [];

  @Input() stockData: StockData | undefined;
  @Input() days: number = 30;

  ngOnInit() {
    this.sortFilterEntries();
  }

  private sortFilterEntries() {
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
          index > 0 ? getPriceDiff(firstEntry.close, close) : undefined;

        const prevDayVar = prevDayClose
          ? getPriceDiff(prevDayClose, close)
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
}
