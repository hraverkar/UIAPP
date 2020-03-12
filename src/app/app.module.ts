import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudyManagementComponent } from './study-management/study-management.component';
import { RisManagementComponent } from './ris-management/ris-management.component';
import { PacsManagementComponent } from './pacs-management/pacs-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { universalService } from './Services/universal.service';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateManagementComponent } from './update-management/update-management.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    StudyManagementComponent,
    RisManagementComponent,
    PacsManagementComponent,
    UpdateManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
  ],
  providers: [universalService,
    {
      provide: MatDialogRef,
      useValue: {}
    }, {
      provide: MAT_DIALOG_DATA, 
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [UpdateManagementComponent]
})
export class AppModule { }
