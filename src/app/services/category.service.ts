import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService, SelectItemGroup, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



import { Category } from '../model/category';
import { DataWithMessages } from '../model/data-with-messages';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesSource: Subject<SelectItemGroup[]> = new Subject();

  private apiUrl = environment.backend.baseURL;

  private categoriesUrl: string = "/api/public/category/all";

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getCategories(): Observable<DataWithMessages<Category[], string[]>> {
    return this.httpClient.get("${this.apiUrl}${this.categoriesUrl}");
  }

  setCategories(categories: SelectItemGroup[]){
    this.categoriesSource.next(categories);
  }

  getCategoriesForSelection(): Observable<SelectItemGroup[]>{
    console.log("Categories are");
    this.getCategories().subscribe({
      next: next => {
        console.log(next);
        this.setCategories(this.handleSuccessfullCategoriesFetch(next));
      },
      error: error => {this.handleFailedCategoryFetch()}
    });

    return this.categoriesSource.asObservable();
  }

  handleSuccessfullCategoriesFetch(data: DataWithMessages<Category[], string[]>): SelectItemGroup[]{
    let result: SelectItemGroup[] = [];
    
    data.data!.filter(data => !data.parentCategory).forEach(catGroup => {
      result.push({
        label: catGroup?.categoryName,
        items: []
      });
    });

    result.forEach(catGroup => data.data?.filter(childCat => childCat.parentCategory?.categoryName == catGroup.label).forEach(childCat => {
      catGroup.items.push({
        label: childCat.categoryName,
        value: childCat
      })
    }));
    
    this.showMessages(data.messages!);

    return result;
  }

  handleFailedCategoryFetch(){
    this.showMessages(["Categories fetch failed"]);
  }

  showMessages(messages: string[]){
    messages.forEach(message => {
      this.messageService.add({
        severity: "info",
        summary: message
      });
    });
  }
}
