import { Component, Input } from '@angular/core';

import { ChartDataset, Item } from 'src/app/interfaces';
import { LoadingService } from 'src/app/services/loading.service';
import { apiDateToObj, getDateFromObj } from 'src/app/utils';

const BAR_COLOR = {
  positive: {
    backgroundColor: '#8cff8c',
  },
  negative: {
    backgroundColor: '#fd7373',
  },
};

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
})
export class StockChartComponent {
  @Input() metaCurrency: string = '';

  @Input() set setItems(items: Item[]) {
    this.resetData();
    this.items = items;
    this.buildChartDatasets();
  }

  public isLoading = this.loadingService.isLoading;

  public items: Item[] = [];
  public chartDatasets: ChartDataset[] = [];
  public chartLabels: string[] = [];

  constructor(private loadingService: LoadingService) {}

  buildChartDatasets() {
    this.chartDatasets = this.items.reduce(
      (chartDatasets: ChartDataset[], item: Item, index: number) => {
        const { open, close, low, high, date } = item;

        const dateObj = apiDateToObj(date);
        const { day, month, year } = getDateFromObj(dateObj);

        const shortDate = `${day}/${month}/${year}`;
        this.chartLabels = this.chartLabels.concat(shortDate);
        const colorSchema = open > close ? 'negative' : 'positive';

        const chartDataset: ChartDataset = {
          ...BAR_COLOR[colorSchema],
          borderWidth: 1,
          label: `${shortDate} ${this.metaCurrency} - Open: ${open} - Close: ${close} - Min/Max`,
          data: [[low, high]],
        };

        return chartDatasets.concat(chartDataset);
      },
      []
    );
  }

  private resetData() {
    this.items = [];
    this.chartLabels = [];
  }
}
