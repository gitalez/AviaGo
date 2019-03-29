import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { InstalacionesDetailsPage } from './instalaciones-details.page';
import { InstalacionesDetailsResolver } from './instalaciones-details.resolver';
import { InstalacionesService } from '../instalaciones.service';

const routes: Routes = [
  
  {
    path: '',
    component: InstalacionesDetailsPage,
    resolve: {
      data: InstalacionesDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    InstalacionesDetailsPage
  ],
  providers: [
    InstalacionesDetailsResolver,
    InstalacionesService
  ]
})
export class InstalacionesDetailsPageModule {}
