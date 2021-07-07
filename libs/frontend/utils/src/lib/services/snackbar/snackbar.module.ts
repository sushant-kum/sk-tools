import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle as fasCheckCircle,
  faExclamationCircle as fasExclamationCircle,
  faExclamationTriangle as fasExclamationTriangle,
  faInfoCircle as fasInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import { SnackbarTemplateComponent } from './components/snackbar-template/snackbar-template.component';
import { SnackbarService } from './snackbar.service';

@NgModule({
  declarations: [SnackbarTemplateComponent],
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, FontAwesomeModule],
  providers: [SnackbarService],
  entryComponents: [SnackbarTemplateComponent],
})
export class SnackbarModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(fasCheckCircle, fasExclamationCircle, fasExclamationTriangle, fasInfoCircle);
  }
}
