import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockTableComponent } from './stock-table/stock-table.component';
import { StockChart } from './stock-chart/stock-chart.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [LoaderComponent, StockChart, StockTableComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, StockChart, StockTableComponent],
})
export class ComponentsModule {}
