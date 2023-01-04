import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SentimentInfo } from 'src/app/models/sentiment-info.model';
import { Sentiment } from 'src/app/models/sentiment.model';
import { StockApiService } from 'src/app/services/stock-api.service';
import { months } from '../../config/months.config';


@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit, OnDestroy {

  symbol: string;
  fromDate: string;
  toDate: string;
  symbolName: string;
  isLoading: boolean = false;
  sentimentData: Sentiment[] = [];
  subscription$: Subscription = new Subscription();

  constructor(
    private readonly stockApiService: StockApiService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getSentimentDateDetails();
    this.getSentiment();
  }


  getSentimentDateDetails(): void {
    const todayDate = new Date().toISOString().slice(0, 10); //converting international standard time to yyyy-mm-dd format
    const d = new Date(todayDate);
    d.setMonth(d.getMonth() - 4);
    this.toDate = todayDate;
    this.fromDate = d.toISOString().slice(0, 10);
  }

  getSentiment(): void {
    this.isLoading = true;
    this.subscription$.add(
      this.stockApiService
        .getSentiment(this.symbol, this.fromDate, this.toDate)
        .subscribe((res: SentimentInfo) => {
          this.sentimentData = res.data;
          this.symbolName = res.symbol;
          this.isLoading = false;
        })
    );
  }

  getMonths(num: number): string {
    return months[num - 1].toUpperCase();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
