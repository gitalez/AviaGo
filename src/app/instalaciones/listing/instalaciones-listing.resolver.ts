import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { InstalacionesService } from '../instalaciones.service';

@Injectable()
export class InstalacionesListingResolver implements Resolve<any> {

  constructor( private instalacionesService: InstalacionesService) {}

  
  resolve() {
    
    // Get the Shell Provider from the service
    const shellProviderObservable = this.instalacionesService.getListingDataWithShell();

    // Resolve with Shell Provider
    const observablePromise = new Promise((resolve, reject) => {
      resolve(shellProviderObservable);
    });
    return observablePromise;
  }
}
