import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { IonicStorageModule } from '@ionic/storage';

//import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@NgModule({

  declarations: [AppComponent],

  entryComponents: [],

  imports: [
    RouterModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    //ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    WebView,
    File,
    Camera,
    BluetoothSerial,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
