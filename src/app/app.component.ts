import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})
export class AppComponent {

  appPages = [
    {
      title: 'Principal',
      url: '/app/categories',
      icon: './assets/sample-icons/side-menu/categories.svg'
    },
    {
      title: 'Perfil',
      url: '/app/user',
      icon: './assets/sample-icons/side-menu/profile.svg'
    },
    {
      title: 'Notificationes',
      url: '/app/notifications',
      icon: './assets/sample-icons/side-menu/notifications.svg'
    }
  ];

  workPages = [
    {
      title: 'Scan',
      url: '/app/categories',
      icon: './assets/sample-icons/tabs/bluetooth.svg'
    },
    {
      title: 'Pass-instalaciones',
      url: '/app/user',
      icon: './assets/sample-icons/side-menu/_ionicons_svg_md-unlock.svg'
    },
    {
      title: 'Config',
      url: '/app/user',
      icon: './assets/sample-icons/side-menu/_ionicons_svg_ios-settings.svg'
    }
  ];


  accountPages = [

    {
      title: 'cambiar mi contraseña',
      url: '/auth/signup',
      icon: './assets/sample-icons/side-menu/_ionicons_svg_ios-key.svg'
    },
    {
      title: 'ver Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    },
    {
      title: 'ir a aviatel.com',
      url: '/getting-started',
      icon: './assets/sample-icons/side-menu/getting-started.svg'
    },
    {
      title: 'cerrar sesion',
      url: '/page-not-found',
      icon: './assets/sample-icons/side-menu/_ionicons_svg_ios-log-out.svg'
    }
  ];

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}
