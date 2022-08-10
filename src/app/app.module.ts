import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MainComponent } from './main/main.component' 
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { LandingPagecarouselComponent } from './landing-pagecarousel/landing-pagecarousel.component';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import { PasswordInputComponent } from './password-input/password-input.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { AppAuthInterceptor } from './services/interceptors/AppAuthInterceptor';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule } from 'primeng/editor';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { RecipeImageUploadComponent } from './recipe-image-upload/recipe-image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    LandingPagecarouselComponent,
    LoginComponent,
    PasswordInputComponent,
    RegisterComponent,
    NewRecipeComponent,
    PageNotFoundComponent,
    RecipeImageUploadComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    PanelModule,
    BrowserAnimationsModule,
    CarouselModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    DividerModule,
    MessageModule,
    ToastModule,
    MultiSelectModule,
    InputNumberModule,
    EditorModule,
    FileUploadModule,
    ImageCropperModule,
    ImageModule
  ],
  providers: [
    AuthService,
    RecipeService,
    MessageService,
    MenuComponent,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
