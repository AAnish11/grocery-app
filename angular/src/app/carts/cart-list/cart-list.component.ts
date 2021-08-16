import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/products/product.service';
import CartListModel from './models/cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  constructor(private readonly productService: ProductService) { }
  cartItem$: Observable<CartListModel[]> = of([]);

  ngOnInit(): void {
    this.fetchCartItems();
    
  }
  fetchCartItems() {
    this.cartItem$ = this.productService.getCartItems();
  }

  onCartItemRemoveHandler(cartItemId: String) {
    this.productService.deleteCartItemById(cartItemId).subscribe(
      () => {
        this.fetchCartItems();
      },
      ()=> {

      })
  }

}
