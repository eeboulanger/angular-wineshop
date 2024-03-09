import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {

    //check if we already have the cart item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      
      //find the item in the cart based on the id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
      
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
      }
    
    
    if (alreadyExistsInCart) {
      //increase quantity
      existingCartItem!.quantity++;
    } else {
      //just add the new item to the cart
      this.cartItems.push(cartItem);
    }

      //compute total cart price and quantity
      this.computeCartTotals();
  }
  
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
