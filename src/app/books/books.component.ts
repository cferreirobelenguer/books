import { Component } from '@angular/core';
import { ServiceBookService } from './serviceBook/service-book.service';
import { Book } from './interfaz/datainterfaz';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  public data: Book[] = [];
  constructor (
    private serviceBookService : ServiceBookService
  ) {
    this.serviceBookService.getJson().subscribe((res:any) =>{
      //get json data books
      this.data = res;
    })
  }
}
