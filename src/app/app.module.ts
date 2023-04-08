import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { AppConfig } from './service/app.config';
import { AuthGuard } from './_guards/auth.guard';
import { Global } from './global';
import { ApiService } from './service/apiServices';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AutofocusDirective } from './directives/autofocus.directive';

//telas
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { MapComponent } from './screens/map/map.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    AutofocusDirective,
    ModalAlertComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NoopAnimationsModule,
    MatDialogModule,
    CurrencyMaskModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: "pt"
    },
    AuthGuard,
    Global,
    ApiService,
  ],
  entryComponents: [  
    ModalAlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
