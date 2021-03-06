import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './guards/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SessionService } from './guards/session.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import {ModalTeamPage } from '../app/modal-team/modal-team.page'
@NgModule({
  declarations: [AppComponent, ModalTeamPage],
  entryComponents: [ ModalTeamPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    SessionService,
    StatusBar,
    SplashScreen,
    Dialogs,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
