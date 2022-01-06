import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit.guard';

const routes: Route[] = [
  { path: '', component: ProductListComponent },
  { 
    path: ':id', 
    canActivate: [ ProductDetailGuard ],
    component: ProductDetailComponent,
  },
  {
    path: ':id/edit',
    canDeactivate: [ ProductEditGuard ],
    component: ProductEditComponent//missing guard
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent    
  ],
  imports: [    
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
