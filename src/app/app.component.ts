import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Item, Items, Meta, StockData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public metaCurrency: string = '';
  public items: Item[] = [];

  constructor(private service: AppService) {}

  search(stockName: string) {
    this.service.stockGet(stockName).subscribe((data: StockData) => {
      const stockMeta: Meta | undefined = data?.meta;
      const stockItems: Items | undefined = data?.items;

      if (!data || !stockMeta || !stockItems) {
        return;
      }

      const itemValues = Object.values(stockItems);
      itemValues.sort((a: Item, b: Item) => a.date_utc - b.date_utc);

      this.metaCurrency = stockMeta.currency;
      this.items = itemValues.slice(-30);
    });
  }
}
