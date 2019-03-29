import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { InstalacionesListingPage } from './instalaciones-listing.page';
import { InstalacionesListingResolver } from './instalaciones-listing.resolver';
import { InstalacionesService } from '../instalaciones.service';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  
  {
    path: '',
    component: InstalacionesListingPage,

    resolve: {
      data: InstalacionesListingResolver
    }
  }
];

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [InstalacionesListingPage],

  providers: [
    InstalacionesListingResolver,
    InstalacionesService
  ]
})
export class InstalacionesListingPageModule {}
