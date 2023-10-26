import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);

  constructor() {}

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addToCart(product: Product) {
    const existingCartItem = this.cart.find((item) => item.product.name === product.name);
  
    if (existingCartItem) {
      existingCartItem.amount += 1;
      existingCartItem.subTotal = existingCartItem.amount * existingCartItem.product.price;
    } else {
      const newCartItem: Cart = {
        product: product,
        amount: 1,
        subTotal: product.price
      };
      this.cart.push(newCartItem);
    }
  
    this.calculateCartTotal();
    this.cartItemCount.next(this.cart.length);
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex((item) => item.product.name === product.name);
    if (index >= 0) {
      if (this.cart[index].amount > 1) {
        this.cart[index].amount -= 1;
        this.cart[index].subTotal = this.cart[index].amount * this.cart[index].product.price;
      } else {
        this.cart.splice(index, 1);
      }
  
      this.calculateCartTotal();
      this.cartItemCount.next(this.cart.length);
    }
  }

  getCartTotalObservable() {
    return this.cartTotal.asObservable();
  }

  calculateCartTotal(): number {
    const total = this.cart.reduce((acc, cartItem) => acc + cartItem.subTotal, 0);
    this.cartTotal.next(total);
    return total;
  }     
}
