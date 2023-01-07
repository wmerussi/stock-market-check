import { Component } from '@angular/core';
import { AppService } from './app.service';
import { StockData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public stockData: StockData | undefined;

  constructor(private service: AppService) {}

  ngOnInit() {
    this.service
      .stockGet('AAPL')
      .subscribe((data: StockData) => (this.stockData = data));
  }
}
