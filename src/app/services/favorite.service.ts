import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private products: Product[] = [];
  private favoriteProductsSubject = new BehaviorSubject<Product[]>(this.products); // se crea un observable para encontrar rastrear y emitir cambios en la lista 
  public favoriteProducts$ = this.favoriteProductsSubject.asObservable(); //se crea un observable publico para que pueda ser visto

  constructor() { }

  addToFav(product: Product) {
    if (!this.products.some(p => p.name === product.name)) {
      this.products.push(product);
      this.favoriteProductsSubject.next(this.products); // se emite un aviso que la lista de favoritos que creamos se ha actualizado
    }
  }

  removeFromFav(product: Product) {
    const index = this.products.findIndex(p => p === product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    this.favoriteProductsSubject.next(this.products);
  }
}
