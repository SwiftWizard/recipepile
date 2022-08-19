import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ImageCropperModule } from 'ngx-image-cropper';

import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule } from 'primeng/editor';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule }from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollerModule } from 'primeng/scroller';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { environment } from 'src/environments/environment';

import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { AppAuthInterceptor } from './services/interceptors/AppAuthInterceptor';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { LandingPagecarouselComponent } from './components/landing-pagecarousel/landing-pagecarousel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RecipeImageUploadComponent } from './components/recipe-image-upload/recipe-image-upload.component';
import { IngredientManagerComponent } from './ingredient-manager/ingredient-manager.component';
import { ExploreRecipesComponent } from './components/explore-recipes/explore-recipes.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    LandingPagecarouselComponent,
    LoginComponent,
    RegisterComponent,
    NewRecipeComponent,
    PageNotFoundComponent,
    RecipeImageUploadComponent,
    IngredientManagerComponent,
    ExploreRecipesComponent,
    RecipeListItemComponent
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
    ImageModule,
    CheckboxModule,
    DialogModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ChipModule,
    PaginatorModule,
    ScrollerModule,
    VirtualScrollerModule
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
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
