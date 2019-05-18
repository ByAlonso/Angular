import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PPComponent } from './pp/pp.component';
import { LoginComponent } from './login/login.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import {UserService} from "./services/user.service";
import {AlertService} from "./services/alert.service";
import {AuthenticationService} from "./services/authentication.service";
import { AlertComponent } from './alert/alert.component';
import {PostService} from "./services/post.service";
import { GeneralComponent } from './feedDisplay/general/general.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    PPComponent,
    LoginComponent,
    UploadFilesComponent,
    ProfileComponent,
    FeedComponent,
    AlertComponent,
    GeneralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService,AlertService,AuthenticationService,PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
