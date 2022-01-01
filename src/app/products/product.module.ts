import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Route, RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [
  { path: '', component: ProductListComponent },
  { 
    path: ':id', 
    canActivate: [ ProductDetailGuard ],
    component: ProductDetailComponent,
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent    
  ],
  imports: [    
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductModule { }
