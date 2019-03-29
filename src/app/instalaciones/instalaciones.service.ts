import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ShellProvider } from '../utils/shell-provider';

import { InstalacionesListingModel } from './listing/instalaciones-listing.model';
import { InstalacionesDetailsModel } from './details/instalaciones-details.model';

@Injectable()
export class InstalacionesService {
  
  private _listingWithShellCache: ShellProvider<InstalacionesListingModel>;
  private _detailsWithShellCache: ShellProvider<InstalacionesDetailsModel>;

  constructor(private http: HttpClient) { }

  public getListingDataWithShell(): Observable<InstalacionesListingModel> {

    // Use cache if we have it.
    if (!this._listingWithShellCache) {
      
      // Initialize the model specifying that it is a shell model
      const shellModel: InstalacionesListingModel = new InstalacionesListingModel(true);
      const dataObservable = this.http.get<InstalacionesListingModel>('./assets/sample-data/travel/listing.json');

      this._listingWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._listingWithShellCache.observable;
  }

  public getDetailsDataWithShell(): Observable<InstalacionesDetailsModel> {
    // Use cache if we have it.
    if (!this._detailsWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: InstalacionesDetailsModel = new InstalacionesDetailsModel(true);
      const dataObservable = this.http.get<InstalacionesDetailsModel>('./assets/sample-data/travel/details.json');

      this._detailsWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._detailsWithShellCache.observable;
  }

}
