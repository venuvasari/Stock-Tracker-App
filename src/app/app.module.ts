import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { StockApiService } from "./services/stock-api.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SentimentComponent } from "./components/sentiment/sentiment.component";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SentimentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
