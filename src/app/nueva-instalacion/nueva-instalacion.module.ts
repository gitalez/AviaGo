import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuevaInstalacionPage } from './nueva-instalacion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaInstalacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuevaInstalacionPage]
})
export class NuevaInstalacionPageModule {}
