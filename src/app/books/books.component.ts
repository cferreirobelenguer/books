import { Component, OnInit } from '@angular/core';
import { ServiceBookService } from './serviceBook/service-book.service';
import { Book } from './interfaz/datainterfaz';
import { Router } from '@angular/router';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  public data: Book[] = [];
  public titledata : string = '';
  public filterData : Book[] =[];
  public option : string ='';
  public orders : string [] = ['Título', 'Autor', 'Editorial'];
  public total : number = 12;
  public limit : number = 0;
  public result: Book[] = [];
  public previous : number = 0;
  
  constructor(
    private serviceBookService: ServiceBookService,
    private router: Router
  ) {}
  
  async ngOnInit(): Promise<void> {
    try {
      const res: any = await this.serviceBookService.getJson().toPromise();
      this.data = res;
  
      if (this.limit === 0) {
        for (let item = 0; item < 3; item++) {
          this.result.push(this.data[item]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //filter search if title starts by the data input
  public handleChange () {
  
    if(this.titledata) {
        this.filterData = this.data.filter(item =>
        item.titulo.toLowerCase().startsWith(this.titledata.toLowerCase())
      );
    }
    
  }

  //sort by title, author and editorial
  public getOption () {
  
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

  //function to sort options
  public handleSort (option: string) {
    
    const orderdata = this.data.sort(function (a: any, b: any) {
      return a[option].localeCompare(b[option], 'en', { numeric: false });
    });
    this.previous = 0;
    this.limit = 3;
    this.result = this.getPagination(this.previous, this.limit);
  }


  public handlePrevious() {
    if (this.previous >= 3) {
      this.limit = this.previous;
      this.previous -= 3;
      this.result = this.getPagination(this.previous, this.limit);
    }
  }

  public handleNext() {

    if (this.limit < this.total && this.limit !== this.total) {
      if (this.previous === 0) {
        this.limit = 3;
      }
        this.previous = this.limit;
        this.limit += 3;
    }
    

    this.result = this.getPagination(this.previous, this.limit);
  }

  public getPagination(previous: number, limit: number) {
    const datosPaginados = [];

    for (let item = previous; item < limit && item < this.data.length; item++) {
      datosPaginados.push(this.data[item]);
    }

    return datosPaginados;
  }
  
  public handleRedirection(id: string) {
    console.log(id)
    this.router.navigate(['info', id])
  }
}
