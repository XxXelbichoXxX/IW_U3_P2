import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public products:Product[] = [];
  public productsFounds: Product[]=[];
  public selectedCategory: string = 'all';


  constructor(private cartService: CartService, private favoriteService: FavoriteService) {
    this.products.push({
      name: 'Coca Cola',
      price: 20,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quasi qui nesciunt veniam sequi aliquid vitae sed quidem, et, rem neque error. At, beatae molestias.',
      type: 'Abarrotes',
      photo: 'https://picsum.photos/200/300?random=',
      style:'red'
    });
    this.products.push({
      name: 'Jabon Zote',
      price: 40,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quasi qui nesciunt veniam sequi aliquid vitae sed quidem, et, rem neque error. At, beatae molestias.',
      type: 'Limpieza',
      photo: 'https://picsum.photos/200/300?random=',
      style:'green'
    });
    this.products.push({
      name: 'Lechuga',
      price: 15,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quasi qui nesciunt veniam sequi aliquid vitae sed quidem, et, rem neque error. At, beatae molestias.',
      type: 'Frutas y Verduras',
      photo: 'https://picsum.photos/200/300?random=',
      style:'violet'
    });
    this.products.push({
      name: 'Paracetamol',
      price: 160,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quasi qui nesciunt veniam sequi aliquid vitae sed quidem, et, rem neque error. At, beatae molestias.',
      type: 'Farmacia',
      photo: 'https://picsum.photos/200/300?random=',
      style:'blue'
    });
      
      this.productsFounds = this.products;
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  addToFav(product: Product) {
    this.favoriteService.addToFav(product);
  }
  public filterProducts() {
    if (this.selectedCategory === 'all') {
      return this.products;
    } else {
      return this.products.filter(product => product.type === this.selectedCategory);
    }
  }
}