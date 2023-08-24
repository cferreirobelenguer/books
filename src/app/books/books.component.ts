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
    //filter search if title starts by the data input
    if(this.titledata) {
        this.filterData = this.data.filter(item =>
        item.titulo.toLowerCase().startsWith(this.titledata.toLowerCase())
      );
    }
    
  }

  public getOption () {
    //sort by title, author and editorial
    console.log("opción de orden ",this.option)
    switch(this.option) {
      case 'Título' :
        this.option= 'titulo';
        this.handleSort(this.option);
        break;
      case 'Autor' :
        this.option = 'autor';
        this.handleSort(this.option);
        break;
      case 'Editorial' :
        this.option = 'editorial';
        this.handleSort(this.option);
        break;
    }
  }

  public handleSort (option: string) {
    //function sort options
    const orderdata = this.data.sort(function (a: any, b: any) {
      return a[option].localeCompare(b[option], 'en', { numeric: false });
    });
    
    console.log(orderdata)
  }
}
