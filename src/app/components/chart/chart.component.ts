import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartDataset } from 'src/app/interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  @Input() chartLabels: string[] = [];
  @Input() currency: string = '';
  @Input() chartDatasets: ChartDataset[] = [];

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  public minChartValue: number | undefined;
  public maxChartValue: number | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.setChartLimits();
    this.fillChart();
  }

  private setChartLimits() {
    this.chartDatasets.forEach((dataset: ChartDataset) => {
      const [[low, high]] = dataset.data;

      if (!this.minChartValue || low < this.minChartValue) {
        this.minChartValue = low;
      }

      if (!this.maxChartValue || high > this.maxChartValue) {
        this.maxChartValue = high;
      }
    });
  }

  private fillChart() {
    if (!this.canvas || !this.chartDatasets.length) {
      return;
    }

    new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [[]],
        datasets: this.chartDatasets,
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
            title: {
              display: true,
              text: this.currency,
            },
          },
        },
      },
    });
  }
}
