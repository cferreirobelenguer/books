import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBookService } from '../books/serviceBook/service-book.service';
import { Book } from '../books/interfaz/datainterfaz';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public id: string | null = '';
  public data: Book[] = [];
  public info: Book = {
    id: '',
    titulo: '',
    genre: '',
    autor: '',
    editorial:'',
    descripcion: '',
    img: '',
    new: false,
    tapa:'',
    ISBN: '',
    otherBooks: ''
  }
  constructor(
    private route: ActivatedRoute,
    private serviceBookService: ServiceBookService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBook(this.id);

  }

  public getBook(id:string | null) {
    //get data with id book
    this.serviceBookService.getJson().subscribe( (res) => {
      this.data = res;
      this.data.forEach((item) => {
        if(item.id === id) {
          this.info = item
        }
      })
      console.log(this.info)
    })
  }

  public handleRedirect() {
    this.router.navigate([''])
  }
}
