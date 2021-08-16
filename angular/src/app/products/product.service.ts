import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import CartListModel from '../carts/cart-list/models/cart.model';
import { ADD_NEW_PRODUCT, ADD_PRODUCT_TO_CART, DELETE_CART_ITEMS, GET_CART_ITEMS, GET_PRODUCT_LIST } from '../constants/api-path.constant';
import { ProductListModel } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpClient) { }

  public readonly getAllProducts = (): Observable<ProductListModel[]> => {
    const path = `${environment.clientUrl}${GET_PRODUCT_LIST}`;
    return this.httpService.get(path).pipe(
      map(
        (resp): ProductListModel[] => {
          return resp as ProductListModel[];
        }
      ),
      catchError(
        (err) => {
          // returning empty data in case of failure accured
          return of([] as ProductListModel[]);
        }
      )
    )
  }

  public addNewProduct = (formData: any) => {
    const path = `${environment.clientUrl}${ADD_NEW_PRODUCT}`;
    return this.httpService.post(path, formData);
  }

  public deleteProductById = (productId: String) => {
    const path = `${environment.clientUrl}${ADD_NEW_PRODUCT}/${productId}`;
    return this.httpService.delete(path);
  }

  public addItemToCartByProductId = (productId: String) => {
    const path = `${environment.clientUrl}${ADD_PRODUCT_TO_CART}/${productId}`;
    return this.httpService.post(path, null);
  }

  public readonly getCartItems = (): Observable<CartListModel[]> => {
    const path = `${environment.clientUrl}${GET_CART_ITEMS}`;
    return this.httpService.get(path).pipe(
      map(
        (resp): CartListModel[] => {
          return resp as CartListModel[];
        }
      ),
      catchError(
        (err) => {
          // returning empty data in case of failure accured
          return of([] as CartListModel[]);
        }
      )
    )
  }

  public deleteCartItemById = (cartId: String) => {
    const path = `${environment.clientUrl}${DELETE_CART_ITEMS}/${cartId}`;
    return this.httpService.delete(path);
  }
}
