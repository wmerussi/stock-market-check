import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Entry, Item, Items, Meta, StockData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public metaCurrency: string = '';
  public items: Item[] = [];

  constructor(private service: AppService) {}

  ngOnInit() {
    this.service.stockGet('AAPL').subscribe((data: StockData) => {
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
