import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    //If CATEGORY ID IS ZERO THEN SHOW ALL PRODUCTS
    if (categoryId == 0) {
      return this.httpClient.get<Product[]>(this.baseUrl).pipe(map(response => response));
    }

    //IF CATEGORY ID IS ADDED THEN SHOW PRODUCTS IN THE GIVEN CATEGORY
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: String): Observable<Product[]> {
    //IF KEYWORD IS ADDED THEN SHOW PRODUCTS CONTAINING THE GIVEN KEYWORD
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response.content));
  }



  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl).pipe(map(response => response));
  }


}

interface GetResponse {
  content: Product[];
}


