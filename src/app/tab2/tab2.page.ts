import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  cartItems: Cart[] = [];
  cartTotal: number = 0;
  private cartTotalSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateCartTotal();

    this.cartTotalSubscription = this.cartService.getCartTotalObservable().subscribe(total => {
      this.cartTotal = total;
    });
  }

  ngOnDestroy() {
    if (this.cartTotalSubscription) {
      this.cartTotalSubscription.unsubscribe();
    }
  }

  removeFromCart(cartItem: Cart) {
    this.cartService.removeFromCart(cartItem.product);
    this.cartItems = this.cartService.getCart();
  }

  addToCart(product: Cart) {
    this.cartService.addToCart(product.product);
    this.cartItems = this.cartService.getCart();
  }

  calculateCartTotal() {
    this.cartTotal = this.cartService.calculateCartTotal();
  }
  
}
