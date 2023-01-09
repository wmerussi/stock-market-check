import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { MessageEnum } from './enums/message.enum';
import { Item, Items, Meta, StockData } from './interfaces';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  public metaCurrency: string = '';
  public items: Item[] = [];
  public message: string = '';

  private subscription: Subscription | undefined;

  constructor(
    private loadingService: LoadingService,
    private service: AppService
  ) {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  search(stockName: string) {
    this.resetData();

    if (!stockName) {
      return;
    }

    this.loadingService.show();

    this.subscription = this.service.stockGet(stockName).subscribe({
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
    this.subscription?.unsubscribe();

    this.metaCurrency = '';
    this.items = [];
    this.message = '';
  }
}
