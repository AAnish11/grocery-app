import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { APP_PRODUCT_ADD } from 'src/app/constants/app-route.constant';
import { ProductListModel } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  addNewProduct = APP_PRODUCT_ADD;
  productListData$: Observable<ProductListModel[]> = of([] as ProductListModel[]);
  showCartAddAlert$: Observable<boolean> = of(false);
  deleteProductAlert$: Observable<boolean> = of(false);

  constructor(private readonly productService: ProductService) { }
  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct() {
    this.productListData$ = this.productService.getAllProducts();
  }

  onDeleteProductHandler(productId: String) {
    this.productService.deleteProductById(productId).subscribe(
      (resp) => {
        this.deleteProductAlert$ = of(true);
        this.hideDeleteProductAlert();
        this.fetchProduct();
      }, (error) => {
      });
  }
  onAddToCartHandler(productId: String) {
    this.productService.addItemToCartByProductId(productId).subscribe(
      (resp) => {
        this.showCartAddAlert$ = of(true);
        this.hideAddToCartAlert();
      }, (error) => {
      });
  }

  hideAddToCartAlert() {
    const interval$ = interval(1000).pipe(take(1));
    interval$.subscribe(() => {
      this.showCartAddAlert$ = of(false);
    });
  }
  hideDeleteProductAlert() {
    const interval$ = interval(1000).pipe(take(1));
    interval$.subscribe(() => {
      this.deleteProductAlert$ = of(false);
    });
  }
}
