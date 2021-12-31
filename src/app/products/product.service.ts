import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
      tap(data => console.log("All: ", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {    
    return this.getProducts().pipe(     
      mergeMap(p => p),
      first(product => product.productId === id)
      );    
  }

  private handleError(err: HttpErrorResponse) {
    // client-side vs server error:
    const errorMessage = err.error instanceof ErrorEvent ?
      `An error occurred: ${err.error.message}` :
      `Server returned code: ${err.status}, error message is: ${err.message}`;   

    console.log(errorMessage);    
    return throwError(() => new Error(errorMessage));
  }
}
