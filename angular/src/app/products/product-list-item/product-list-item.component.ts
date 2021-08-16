import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductListModel } from '../models/product.model';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() item: ProductListModel;
  @Output() deleteProductCallback = new EventEmitter<string>();
  @Output() addToCartHandler = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteProductHandler() {
    this.deleteProductCallback.emit(this.item._id);
  }
  onAddToCartClickHandler() {
    this.addToCartHandler.emit(this.item._id);
  }

}
