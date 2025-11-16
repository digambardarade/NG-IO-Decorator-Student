import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudDashboardComponent } from './shared/components/stud-dashboard/stud-dashboard.component';
import { StudFormComponent } from './shared/components/stud-form/stud-form.component';
import { StudTableComponent } from './shared/components/stud-table/stud-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StudDashboardComponent,
    StudFormComponent,
    StudTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
