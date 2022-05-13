import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  txtNaziv: any;
  txtCijena: any;
  txtDatumObjave: any;
  txtGrad: any;
  txtBrend: any;
  txtKategorija: any;
  txtSpol: any;
  txtStanje: any;
  txtGodiste: any;
  txtKilometraza: any;
  registrovan: any=false;
  plin: any=false;
  klima: any=false;
  abs: any=false;
  txtGorivo: any;
  txtModel: any;
  txtDetaljanopis: any

  file: any;
  res: any;
  Korisnik: any;

  Kategorije: any;
  Gradovi: any;
  Brendovi: any;
  Spolovi: any;
  Stanja: any;

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.UcitajGradove();
    this.UcitajKategorije();
    this.UcitajBrendove();
    this.UcitajSpolove();
    this.UcitajSatnje();
  }


  UcitajKategorije() {
    this.httpKlijent.get("https://localhost:44308/KategorijaProdukta/GetAll").subscribe((x: any) => {
      console.log("Kategorije", x)
      this.Kategorije = x;
    })
  }

  UcitajGradove() {
    this.httpKlijent.get("https://localhost:44308/Grad/GetAll").subscribe((x: any) => {
      console.log("Gradovi", x);
      this.Gradovi = x;
    })
  }

  UcitajBrendove() {
    this.httpKlijent.get("https://localhost:44308/Brand/GetAll").subscribe((x: any) => {
      console.log("Brendovi", x);
      this.Brendovi = x;
    })
  }

  UcitajSpolove() {
    this.httpKlijent.get("https://localhost:44308/Spol/GetAll").subscribe((x: any) => {
      console.log("Spolovi");
      this.Spolovi = x;
    })
  }

  UcitajSatnje() {
    this.httpKlijent.get("https://localhost:44308/Stanje/GetAll").subscribe((x: any) => {
      console.log("Stanja", x);
      this.Stanja = x;
    })
  }

  selectFile(e: any) {
    this.file = e.target.files[0];
  }

  upload() {
    let formData = new FormData();
    formData.append('file', this.file);
    this.httpKlijent.post("https://localhost:44308/Artikal/Upload", formData).toPromise().then(
      res => {
        console.log(res);
        this.res = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  BtnPosalji() {

    let formData = new FormData();
    formData.append('file', this.file);

    let podaci = {
      Kategorija_Produkta_id: this.txtKategorija,
      Brend_id: this.txtBrend,
      korisnik_id: AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
      NazivArtikla: this.txtNaziv,
      Cijena: this.txtCijena,
      Aktivan: true,
      Stanje_id: this.txtStanje,
      DatumObjave: new Date(),
      SlikaArtikla: this.file,
      Godiste: this.txtGodiste,
      Kilometraza: this.txtKilometraza,
      Registrovan: this.registrovan,
      Plin: this.plin,
      Klima: this.klima,
      ABS: this.abs,
      Gorivo: this.txtGorivo,
      Model: this.txtModel,
      DetaljanOpis: this.txtDetaljanopis,


    };
    console.log("prije",podaci);

    this.httpKlijent.post("https://localhost:44308/Artikal/Add", podaci)
      .subscribe((x: any) => {
        if (x != null) {
          alert("Uspjesno dodan artikal");
          console.log("x", x);
          console.log(this.Korisnik);

          this.router.navigate(['homepage'])
            .then(() => {
              window.location.reload();
            });
        } else {
          alert("Pogresan unos");
        }
      })
  }

  registrovanchechbox(Event: any) {
    if (Event.target.checked) {
      this.registrovan = true;
    } else {
      this.registrovan = false;
    }
  }

  plinbox(Event: any) {
    if (Event.target.checked) {
      this.plin = true;
    } else {
      this.plin = false;
    }
  }

  klimabox(Event: any) {
    if (Event.target.checked) {
      this.klima = true;
    } else {
      this.klima = false;
    }
  }


  absbox(Event: any) {
    if (Event.target.checked) {
      this.abs = true;
    } else {
      this.abs = false;
    }
  }
}
