import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockTableComponent } from './stock-table/stock-table.component';
import { StockChart } from './stock-chart/stock-chart.component';

@NgModule({
  declarations: [StockChart, StockTableComponent],
  imports: [CommonModule],
  exports: [StockChart, StockTableComponent],
})
export class ComponentsModule {}
