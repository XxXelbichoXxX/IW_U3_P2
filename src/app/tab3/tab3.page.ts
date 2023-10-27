import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  favoriteProducts: Product[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.favoriteProducts$.subscribe(products => {
      this.favoriteProducts = products;
    });
  }

  removeFromFav(product: Product) {
    this.favoriteService.removeFromFav(product);
  }
  
}
