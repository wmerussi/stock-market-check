import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockTableComponent } from './stock-table/stock-table.component';

@NgModule({
  declarations: [StockTableComponent],
  imports: [CommonModule],
  exports: [StockTableComponent],
})
export class ComponentsModule {}
