import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockData } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AppService {
  private apiUrl: string =
    'https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/{symbol}/1d';

  constructor(private http: HttpClient) {}

  stockGet(stockName: string): Observable<StockData> {
    const url = this.getUrl(stockName);
    return this.http.get<StockData>(url);
  }

  private getUrl(symbol: string): string {
    return this.apiUrl.replace('{symbol}', symbol);
  }
}
