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
  public titledata : string = '';
  constructor (
    private serviceBookService : ServiceBookService
  ) {
    this.serviceBookService.getJson().subscribe((res:any) =>{
      //get json data books
      this.data = res;
    })
  }

  public handleChange () {
    let number= '0123456789'
    //we validate if titledata is not a number
    if (!number.split('').some(digit => this.titledata.includes(digit))) {
      console.log(this.titledata);
      this.titledata = this.titledata.toLowerCase();
    }

  }
}
