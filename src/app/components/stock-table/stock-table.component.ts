import { Component, Input } from '@angular/core';
import { Entry, Item, Items, StockData } from 'src/app/interfaces';
import { getPriceDiff } from 'src/app/utils';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
})
export class StockTableComponent {
  @Input() stockData: StockData | undefined;
  @Input() days: number = 30;

  public entries: Entry[] = [];
  public currencySymbol: string | undefined;

  ngOnInit() {
    this.sortFilterEntries();

    this.currencySymbol = this.stockData?.meta.currency;
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
    console.log('lastEntries', lastEntries);

    this.entries = lastEntries.reduce(
      (items: Entry[], item: Item, index: number) => {
        const { close, date } = item;

        const [month, day, year] = date.split('-').map((num: string) => +num);
        const dateObj = new Date(year, month, day);

        const prevDayClose =
          index > 0 ? lastEntries[index - 1]?.close : undefined;

        const firstDayVar =
          index > 0 ? getPriceDiff(firstEntry.close, close) : undefined;

        const prevDayVar = prevDayClose
          ? getPriceDiff(prevDayClose, close)
          : undefined;

        const entry: Entry = {
          id: index + 1,
          date: dateObj,
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
