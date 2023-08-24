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
  public filterData : Book[] =[];
  public option : string ='';
  public orders : string [] = ['Título', 'Autor', 'Editorial'];
  
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
      //filter search if title starts by the data input
      this.filterData = this.data.filter(item =>
        item.titulo.toLowerCase().startsWith(this.titledata.toLowerCase())
      );
    }
  }

  public getOption () {
    console.log("opción de orden ",this.option)
  }
}
