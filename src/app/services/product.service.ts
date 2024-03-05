import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    //SHOW ALL PRODUCTS
    if (categoryId == 0) {
      return this.httpClient.get<Product[]>(this.baseUrl).pipe(map(response => response));
    }

    //IF CATEGORY ID IS ADDED THEN SHOW PRODUCTS IN THE GIVEN CATEGORY
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response.content));

  }
}

interface GetResponse {
  content: Product[];
}


