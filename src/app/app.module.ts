import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FetchDataService } from './services/fetchData/fetch-data.service';
import { CacheService } from './services/cacheService/cache.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardsComponent } from './components/cards/cards.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CardsComponent,
    ErrorComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [FetchDataService, CacheService],
  bootstrap: [AppComponent],
})
export class AppModule {}
