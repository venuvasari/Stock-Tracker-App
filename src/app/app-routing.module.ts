import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'sentiment/:symbol', component: SentimentComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
