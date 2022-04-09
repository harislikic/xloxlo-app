import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UserObjavljeniArtikliComponent } from './user-objavljeni-artikli/user-objavljeni-artikli.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutomobiliComponent } from './kategorija/automobili/automobili.component';
import { BiciklaComponent } from './kategorija/bicikla/bicikla.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SignUpComponent,

    EditProfileComponent,
    ProductPageComponent,
    AddArticleComponent,
    UserObjavljeniArtikliComponent,
    AutomobiliComponent,
    BiciklaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
