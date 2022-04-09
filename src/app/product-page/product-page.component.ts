import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginInformacije } from '../_helpers/login-informacije';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  Artikal:any;
  Vlasnikid:any;
  isAdmin:boolean = AutentifikacijaHelper.getLoginInfo().isPerimisijaAdmin;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikal(); 

  }
  UcitajArtikal(){
    this.httpKlijent.get("https://localhost:44308/Artikal/Get/"+ localStorage.getItem("ProduktDetalji"))
    .subscribe(x=>{
      console.log("ArtikalProductPage", x);
      this.Artikal = x;
    });

  }

}
