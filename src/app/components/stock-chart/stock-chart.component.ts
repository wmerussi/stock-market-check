import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { ChartDataset, Item } from 'src/app/interfaces';
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
export class StockChart implements OnInit {
  @Input() metaCurrency: string = '';
  @Input() items: Item[] = [];

  @ViewChild('chartCanvas', { static: true }) chartCanvas:
    | ElementRef
    | undefined;

  public chartLabels: string[] = [];
  public minChartValue: number | undefined;
  public maxChartValue: number | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    if (!this.chartCanvas || !this.items.length) {
      return;
    }

    const datasets = this.items.reduce(
      (chartDatasets: ChartDataset[], item: Item, index: number) => {
        const { close, low, high, date } = item;
        this.setMinMaxChartValues(low, high);

        const dateObj = apiDateToObj(date);
        const { day, month, year } = getDateFromObj(dateObj);

        const shortDate = `${day}/${month}/${year}`;
        this.chartLabels = this.chartLabels.concat(shortDate);

        const prevItem = this.items[index - 1];
        const colorSchema =
          !!prevItem && close < prevItem.close ? 'negative' : 'positive';

        const chartDataset: ChartDataset = {
          ...BAR_COLOR[colorSchema],
          borderWidth: 1,
          label: `${shortDate} - Close: ${close} - Min/Max`,
          data: [[low, high]],
        };

        return chartDatasets.concat(chartDataset);
      },
      []
    );

    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [[]],
        datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: this.minChartValue,
            max: this.maxChartValue,
          },
        },
      },
    });
  }

  private setMinMaxChartValues(low: number, high: number) {
    if (!this.minChartValue || low < this.minChartValue) {
      this.minChartValue = low;
    }

    if (!this.maxChartValue || high > this.maxChartValue) {
      this.maxChartValue = high;
    }
  }
}
