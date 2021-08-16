import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APP_CATEGORY_ADD, APP_CATEGORY_LIST } from '../constants/app-route.constant';
import CategoryListModel from './models/category-list.model';
import { catchError, map } from 'rxjs/operators';
import { ADD_NEW_CATEGORY, GET_CATEGORY_LIST } from '../constants/api-path.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpClient) { }

  public readonly getCategoryList = (): Observable<CategoryListModel[]> => {
    const path = `${environment.clientUrl}${GET_CATEGORY_LIST}`;
    return this.httpService.request('get', path)
      .pipe(
        map(
          (res): CategoryListModel[] => {
            return res as CategoryListModel[];
          }
        ),
        catchError((error: HttpErrorResponse) => {
          return of([] as CategoryListModel[]);
        })
      );
  }

  public addNewCategory = (formData: any) => {
    const path = `${environment.clientUrl}${ADD_NEW_CATEGORY}`;
    return this.httpService.post(path, formData);
  }
}
