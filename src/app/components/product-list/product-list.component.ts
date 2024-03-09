import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = -1;
  previousCategoryId: number = -1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousSearchKeyword = "";

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get("keyword")!;

    console.log(`keyword=${keyword}, thePageNumber=${this.thePageNumber}`);

    if (this.previousSearchKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousSearchKeyword = keyword;



    this.productService.searchListPagination(this.thePageNumber - 1,
      this.thePageSize,
      keyword)
      .subscribe(this.processResults());
  }

  handleListProducts() {
    //check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the id parameter string and convert to number
      this.currentCategoryId = + this.route.snapshot.paramMap.get("id")!;
    } else {
      //no category id available
      this.currentCategoryId = -1;
    }

    //If we have a different category id than before, then set pagenumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPagination(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
       this.processResults()
      )
  }

  updatePageSize(value: string) {
    this.thePageSize = +value;
    this.thePageNumber = 1;
    this.listProducts();
  }


  processResults() {

    return (data: any) => {
      this.products = data.content;
      this.thePageNumber = data.pageable.pageNumber + 1;
      this.thePageSize = data.pageable.pageSize;
      this.theTotalElements = data.totalElements;
    };
  }

  addToCart(product:Product){
    console.log("adding to cart "+ product.name);
  }
}
