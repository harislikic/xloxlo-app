import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  Artikli: any;
  searchtext: any;
  zam: any;
  Kategorije: any;

  constructor(private httpKlijent: HttpClient, private router: Router) {}

  totalLength: any;
  page: number = 1;

  ngOnInit(): void {
    this.UcitajArtikle();
    this.UcitajKategorije();
    this.totalLength = this.Artikli?.length;
  }
  UcitajPoKategoriji(id: any = null) {
    if (id != null) {
      return (this.Artikli = this.zam.filter(
        (x: any) => x.kategorija_Produkta_id == id
      ));
    }
  }
  UcitajKategorije() {
    this.httpKlijent
      .get('https://localhost:5001/KategorijaProdukta/GetAll')
      .subscribe((x) => {
        this.Kategorije = x;
      });
  }
  UcitajArtikle() {
    this.httpKlijent
      .get('https://localhost:5001/Artikal/GetAll')
      .subscribe((x) => {
        console.log('Artikli', x);
        this.Artikli = x;
        this.zam = x;
      });
  }
  Pretraga() {
    if (this.searchtext == ' ') {
      this.ngOnInit();
    } else {
      return (this.Artikli = this.zam.filter((x: any) =>
        x.nazivArtikla.toLowerCase().includes(this.searchtext)
      ));
    }
  }

  ProduktDetalji(id: any) {
    this.router.navigate(['product']);
    localStorage.setItem('ProduktDetalji', id);
  }

  izvjestaj() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    this.httpKlijent
      .get('https://localhost:5001/Report/Report', {
        headers: headers,
        responseType: 'blob' as 'json',
      })
      .subscribe((x) => {});
  }
}
