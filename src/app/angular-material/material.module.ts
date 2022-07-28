import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';

const material = [
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatProgressBarModule,
  MatMenuModule,
  ScrollingModule,
  MatTooltipModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
