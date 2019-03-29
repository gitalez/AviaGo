import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InstalacionesListingModel } from './instalaciones-listing.model';
import { Platform, Events } from '@ionic/angular';
import { MemoriaService } from '../../services/memoria.service';


@Component({
  selector: 'app-instalaciones-listing',
  templateUrl: './instalaciones-listing.page.html',
  styleUrls: [
    './styles/instalaciones-listing.page.scss',
    './styles/instalaciones-listing.shell.scss'
  ]
})
export class InstalacionesListingPage implements OnInit {


  listing: InstalacionesListingModel;
  lista : boolean = false;

  @HostBinding('class.is-shell') get isShell() {
    
    return (this.listing && this.listing.isShell) ? true : false;
  }
  memories = [];

  constructor(
    private plt: Platform, 
    public memoriaService : MemoriaService, 
    private route: ActivatedRoute,
    private events: Events
    ) {
      this.events.subscribe('reload-memories', () => {
        this.loadMemories()
      })
    }



  ngOnInit(): void {

    this.plt.ready().then(() => {
      this.loadMemories();
      console.log('lo que esta en memoria',this.memories);
  });
  

    if (this.route && this.route.data) {

      // We resolved a promise for the data Observable
      const promiseObservable = this.route.data;
      console.log('Route Resolve Observable => promiseObservable: ', promiseObservable);

      if (promiseObservable) {

        promiseObservable.subscribe( promiseValue => {

          const dataObservable = promiseValue['data'];
          console.log('Subscribe to promiseObservable => dataObservable: ', dataObservable);

          if (dataObservable) {

            dataObservable.subscribe(observableValue => {

              const pageData: InstalacionesListingModel = observableValue;

              // tslint:disable-next-line:max-line-length
              console.log('Subscribe to dataObservable (can emmit multiple values) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
              // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
              // and the real remote data once it gets fetched
              
              if ( pageData ) {
                this.listing = pageData;
              }
            });
          } else {
            console.warn('No dataObservable coming from Route Resolver promiseObservable');
          }
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }

  loadMemories() {
    this.memoriaService.getMemories().then(result => {
      this.memories = result;
      console.log('resultado de lectura en mem', result);
    });
  }
  
  cambiar(){

    if(this.lista){

      this.lista= false

    }else{
      this.lista = true
    }
  }
}
