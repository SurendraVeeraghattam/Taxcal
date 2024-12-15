import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// import { matDatepickerAnimations, MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserformComponent } from './Form/userform/userform.component';
import { IncomeformComponent } from './Form/incomeform/incomeform.component';
import { DatapageComponent } from './Form/datapage/datapage.component';
import { MatTableModule } from '@angular/material/table';
import { DataComponent } from './Form/data/data.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
// import { CurrencyPipe } from './pipe/currency.pipe';
import { ColorchangeDirective } from './directive/colorchange.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalendarModule } from 'primeng/calendar';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AcademicyearPipe } from './pipe/academicyear.pipe'; 
import { DateAdapter } from '@angular/material/core';
import { AppDateAdapter } from './pipe/app-date-adapter';
import { MatSort } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignupComponent } from './Form/signup/signup.component';
import { LoginComponent } from './Form/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserformComponent,
    IncomeformComponent,
    DatapageComponent,
    DataComponent,
    ColorchangeDirective,
    HomeComponent,
    AcademicyearPipe,
    SignupComponent,
    LoginComponent,
   
    // CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:5000,
      progressBar:true,
      positionClass: 'toast-top-center',
      titleClass: "center",
      messageClass: "center",
    }),
  ],
  
  providers: 
  [{provide: DateAdapter, useClass: AppDateAdapter},
    CurrencyPipe,DatePipe],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})

export class AppModule { }

// @NgModule({
//   declarations: [EditcolorDirective],
//   exports: [EditcolorDirective]
// })

