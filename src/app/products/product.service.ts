import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, mergeMap, first  } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(this.debugData),
      catchError(this.handleError)
    );
  }

  debugData(data: Product[]) {
    // Uncomment to debug:
    //console.log("getProducts: ", JSON.stringify(data));
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
        
    return this.getProducts().pipe(     
      mergeMap(p => p),
      first(product => product.productId === id)
      );    
  }

  createProduct(product: Product): Observable<Product> {
    // mock
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    // mock
    return of(product);
  }

  deleteProduct(productId: number): Observable<{}> {
    // mock
    return of({});
  }

  private handleError(err: HttpErrorResponse) {
    // client-side vs server error:
    const errorMessage = err.error instanceof ErrorEvent ?
      `An error occurred: ${err.error.message}` :
      `Server returned code: ${err.status}, error message is: ${err.message}`;   

    console.log(errorMessage);    
    return throwError(() => new Error(errorMessage));
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      productId: 0,
      productName: '',
      productCode: '',
      tags: [''],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
      imageThumbnailUrl: ''
    };
  }
}
