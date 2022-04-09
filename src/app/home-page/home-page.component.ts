import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MojConfig } from '../moj-config';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { LoginInformacije } from '../_helpers/login-informacije';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  Artikli:any;
  searchtext : any;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikle();


  }
  UcitajArtikle(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetAll")
    .subscribe(x=>{
      console.log("Artikli", x);
      this.Artikli = x;
    });

  }

ProduktDetalji(id:any){
  this.router.navigate(['product'])
  localStorage.setItem("ProduktDetalji", id);
}

}
