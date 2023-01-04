import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Quote } from '../models/quote.model';
import { Observable, timeout } from 'rxjs';
import { StockSymbols } from '../models/stock-symbols.model';
import { SentimentInfo } from '../models/sentiment-info.model';


@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private apiBaseURL: string = 'https://finnhub.io/api/v1/';
  private apiKey: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) { } //Uses RxJS based APIs and functions

  getStockSymbols(symbol: string): Observable<StockSymbols> {
    return this.http.get<StockSymbols>(
      `${this.apiBaseURL}search?q=${symbol}&token=${this.apiKey}`
    ).pipe(timeout(5000));
  }

  getQuote(symbol: string): Observable<Quote> {
    // ex :- symbol -AAPL
    const Quote = this.http.get<Quote>(
      `${this.apiBaseURL}quote?symbol=${symbol}&token=${this.apiKey}`
    ).pipe(timeout(5000));
    return Quote;
  }

  getSentiment(symbol: string, from: string, to: string){
    return this.http.get<SentimentInfo>(
      `${this.apiBaseURL}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=2022-12-31&token=${this.apiKey}`
    );
  }
}