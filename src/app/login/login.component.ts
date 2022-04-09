import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MojConfig } from '../moj-config';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { LoginInformacije } from '../_helpers/login-informacije';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  txtPassword : any;
  txtKorisnickoIme: any;

  show: boolean = false;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
  }

  btnLogin()
  {
    let saljemo={
      korisnickoIme:this.txtKorisnickoIme,
      lozinka:this.txtPassword
    };
    
    this.httpKlijent.post<LoginInformacije>("https://localhost:44308/Autentifikacija/Login", saljemo)
    .subscribe((x:LoginInformacije)=>{
      if(x !=null)
      {
        alert("Dobrodosli!");
        AutentifikacijaHelper.setLoginInfo(x);
        console.log("x", x);
        this.router.navigate(['homepage'])
        .then(() => {
          window.location.reload();
        });

      }
      else{
        AutentifikacijaHelper.setLoginInfo(null as any)
        alert("Neispravan login,pokusajte ponovo!" );
      }

    });
  }
  
  password() {
    this.show = !this.show;
}

}
