import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public pageTitle = "Product Detail";
  product: Product | undefined;
  errorMessage = "";
  sub: Subscription | undefined;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });   
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
