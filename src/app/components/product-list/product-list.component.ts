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
  currentCategoryId: number = 0;
  searchMode:boolean=false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
    this.listProducts();
    });
  }

  listProducts() {

    this.searchMode=this.route.snapshot.paramMap.has("keyword");

    if(this.searchMode){
      this.handleSearchProducts()
    } else{
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
   const keyword=this.route.snapshot.paramMap.get("keyword")!;

   this.productService.searchProducts(keyword).subscribe(
    data=> {
      console.log(JSON.stringify(data))
      this.products=data;
    }
   )
  }

  handleListProducts(){
    //check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get the id parameter string and convert to number
      this.currentCategoryId= + this.route.snapshot.paramMap.get("id")!;
    } else {
      //no category id available
      this.currentCategoryId=0;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
