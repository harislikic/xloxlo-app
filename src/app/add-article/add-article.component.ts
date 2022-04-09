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

  txtNaziv:any;
  txtCijena:any;
  txtDatumObjave:any;
  txtGrad:any;
  txtBrend:any;
  txtKategorija:any;
  txtSpol:any;
  txtStanje:any;


  file:any;
  res:any;
  Korisnik:any;

  Kategorije:any;
  Gradovi:any;
  Brendovi:any;
  Spolovi:any;
  Stanja:any;

  constructor(private httpKlijent:HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.UcitajGradove();
    this.UcitajKategorije();
    this.UcitajBrendove();
    this.UcitajSpolove();
    this.UcitajSatnje();
  }
  UcitajKategorije(){
    this.httpKlijent.get("https://localhost:44308/KategorijaProdukta/GetAll").subscribe((x:any)=>{
      console.log("Kategorije",x)
      this.Kategorije =x;
    })
  }
  UcitajGradove(){
    this.httpKlijent.get("https://localhost:44308/Grad/GetAll").subscribe((x:any)=>{
      console.log("Gradovi",x);
      this.Gradovi = x;
    })
  }
  UcitajBrendove(){
    this.httpKlijent.get("https://localhost:44308/Brand/GetAll").subscribe((x:any)=>{
      console.log("Brendovi",x);
      this.Brendovi = x;
    })
  }
  UcitajSpolove(){
    this.httpKlijent.get("https://localhost:44308/Spol/GetAll").subscribe((x:any)=>{
      console.log("Spolovi");
      this.Spolovi=x;
    })
  }
  UcitajSatnje(){
    this.httpKlijent.get("https://localhost:44308/Stanje/GetAll").subscribe((x:any)=>{
      console.log("Stanja",x);
      this.Stanja= x;
    })
  }

  selectFile(e:any)
  {
    this.file = e.target.files[0];
  }
  upload()
  {
   let formData = new FormData();
   formData.append('file',this.file);
   this.httpKlijent.post("https://localhost:44308/Slika/Upload",formData).
     toPromise().then(
       res =>{
         console.log(res);
         this.res = res;
       },
     err=>{
        console.log(err);
     }
   );
  }


  BtnPosalji() {
    let podaci={
      nazivArtikla:this.txtNaziv,
      cijena:this.txtCijena,
      datumObjave:this.txtDatumObjave,
      brend_id:this.txtBrend,
      kategorija_Produkta_id:this.txtKategorija,
      spol_id:this.txtSpol,
      stanje:this.txtStanje,
      korisnik_id:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
    };
   console.log(podaci);

    this.httpKlijent.post("https://localhost:44308/Artikal/Add"  ,podaci)
      .subscribe((x:any)=>{
        if(x!=null) {
          alert("Uspjesno dodan artikal");
          console.log("x", x);
          console.log(this.Korisnik);
          this.router.navigate(['homepage'])
            .then(() => {
              window.location.reload();
            });
        }
        else {
          alert("Pogresan unos");
        }
      })
  }
}
