import { Component, Input } from '@angular/core';
import { Entry, Item } from 'src/app/interfaces';
import { LoadingService } from 'src/app/services/loading.service';
import { apiDateToObj, getPriceDiff } from 'src/app/utils';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
})
export class StockTableComponent {
  @Input() metaCurrency: string = '';

  @Input() set setItems(items: Item[]) {
    this.items = items;
    this.sortFilterEntries();
  }

  public isLoading = this.loadingService.isLoading;

  public items: Item[] = [];
  public entries: Entry[] = [];

  constructor(private loadingService: LoadingService) {}

  private sortFilterEntries() {
    const firstItem = this.items[0];

    this.entries = this.items.reduce(
      (items: Entry[], item: Item, index: number) => {
        const { close, date } = item;
        const dateObj = apiDateToObj(date);

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
