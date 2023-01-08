import { Component } from '@angular/core';
import { AppService } from './app.service';
import { MessageEnum } from './enums/message.enum';
import { Item, Items, Meta, StockData } from './interfaces';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public metaCurrency: string = '';
  public items: Item[] = [];
  public message: string = '';

  constructor(
    private loadingService: LoadingService,
    private service: AppService
  ) {}

  search(stockName: string) {
    this.resetData();
    this.loadingService.show();

    this.service.stockGet(stockName).subscribe({
      next: (data: StockData) => {
        const stockMeta: Meta | undefined = data?.meta;
        const stockItems: Items | undefined = data?.items;

        if (!data || !stockMeta || !stockItems) {
          this.loadingService.hide();
          this.message = MessageEnum.NO_RESULT;
          return;
        }

        const itemValues = Object.values(stockItems);
        itemValues.sort((a: Item, b: Item) => a.date_utc - b.date_utc);

        this.metaCurrency = stockMeta.currency || '';
        this.items = itemValues.slice(-30);
        this.loadingService.hide();
      },
      error: () => {
        this.message = MessageEnum.ERROR;
        this.loadingService.hide();
      },
    });
  }

  private resetData() {
    this.metaCurrency = '';
    this.items = [];
    this.message = '';
  }
}
