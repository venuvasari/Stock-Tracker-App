import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from 'src/app/models/quote.model';
import { Stckinfo } from 'src/app/models/stckinfo.model';
import { StockInfo } from 'src/app/models/stock-info.model';
import { StockSymbols } from 'src/app/models/stock-symbols.model';
import { Stocks } from 'src/app/models/stocks.model';
import { StockApiService } from 'src/app/services/stock-api.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {

  trackStockForm: FormGroup;
  stockInfo: StockInfo[] = [];
  stockList: Stocks[] = [];
  quoteData = [];
  stockSymbols: StockSymbols;
  quotes: Quote;
  subscriptionData$: Subscription = new Subscription(); //$ suffixed- is a soft convention to indicate that the variable is a stream.
  isLoading: boolean = false;

  constructor(private readonly stockApiService: StockApiService) {
  }

  ngOnInit(): void {
    this.stockInput();    
    this.getStocks();
  }

  stockInput(): void {
    this.trackStockForm = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });    
  }

  submit(): void {
    this.isLoading = true;
    //console.log(this.trackStockForm.value);
    const { symbol } = this.trackStockForm.value; //ex: {symbol: 'aapl'}

    this.subscriptionData$.add(
      combineLatest({
        stockSymbols: this.stockApiService.getStockSymbols(symbol),
        quotes: this.stockApiService.getQuote(symbol),
      })
        .pipe(
          map((response: Stckinfo) => {
          //console.log(response);
            
            this.stockSymbols = response.stockSymbols;
            // console.log(this.stockSymbols);            
            this.quotes = response.quotes;
            //console.log(this.quotes);            
            const list = {
              description: this.stockSymbols.result[0].description,
              symbol: this.stockSymbols.result[0].symbol,
            };
           //console.log(list);                     
            this.stockInfo.push(list); //set of Description(Company full name) and Symbol will be pushed to StockInfo
            this.quoteData.push(this.quotes); // real time quote data will be added to quoteData
            this.setQuotes();
          })
        )
        .subscribe(next => console.log('next:', next),
        err => console.log('error:', err),
        () => console.log('Completed'),)
    );
    setTimeout(() => { }, 3000);
  }


  getStocks(): void {
    const stocks = localStorage.getItem('stockInfo');    
    this.stockList = stocks ? JSON.parse(stocks) : []; //result is false if the variable is the empty String (its length is zero); otherwise the result is true
    this.stockInfo = this.stockList;

  }


  setQuotes(): void {
    this.stockInfo.map((element, i) => {
     console.log(element+" = "+i);      
      this.stockList[i] = {
        description: this.stockInfo[i]?.description,
        symbol: this.stockInfo[i]?.symbol,
        d: this.quoteData[i]?.d,
        c: this.quoteData[i]?.c,
        o: this.quoteData[i]?.o,
        h: this.quoteData[i]?.h,

      };
    });
    localStorage.setItem('stockInfo', JSON.stringify(this.stockList));
    this.resetForm();
    this.isLoading = false;
  }

  resetForm(): void {
    this.trackStockForm.reset();
  }

  removeStock(index: number): void {
    this.stockList.splice(index, 1);
    this.stockInfo = this.stockList;
    localStorage.setItem('stockInfo', JSON.stringify(this.stockList));
  }

  ngOnDestroy(): void {
    this.subscriptionData$.unsubscribe();
  }
}

