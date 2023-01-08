import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StockTableComponent } from './stock-table/stock-table.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    ChartComponent,
    LoaderComponent,
    SearchBarComponent,
    StockChartComponent,
    StockTableComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ChartComponent,
    LoaderComponent,
    SearchBarComponent,
    StockChartComponent,
    StockTableComponent,
  ],
})
export class ComponentsModule {}
