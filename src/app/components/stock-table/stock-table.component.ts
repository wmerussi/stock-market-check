import { Component, Input, OnInit } from '@angular/core';
import { Entry, Item, Items, StockData } from 'src/app/interfaces';
import { getPriceDiff } from 'src/app/utils';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
})
export class StockTableComponent implements OnInit {
  @Input() metaCurrency: string = '';
  @Input() items: Item[] = [];

  public entries: Entry[] = [];

  ngOnInit() {
    this.sortFilterEntries();
  }

  private sortFilterEntries() {
    const firstItem = this.items[0];

    this.entries = this.items.reduce(
      (items: Entry[], item: Item, index: number) => {
        const { close, date } = item;

        const [month, day, year] = date.split('-').map((num: string) => +num);
        const dateObj = new Date(year, month, day);

        const prevDayClose =
          index > 0 ? this.items[index - 1]?.close : undefined;

        const firstDayVar =
          index > 0 ? getPriceDiff(firstItem.close, close) : undefined;

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
