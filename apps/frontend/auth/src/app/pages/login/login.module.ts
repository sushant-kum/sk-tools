import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAsterisk as fasAsterisk,
  faAt as fasAt,
  faExclamationCircle as fasExclamationCircle,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    // Angular imports
    CommonModule,
    ReactiveFormsModule,

    // Angular material imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    // Fontawesome imports
    FontAwesomeModule,

    // Inbuild imports
    LoginRoutingModule,
  ],
})
export class LoginModule {
  constructor(faIconLibrary: FaIconLibrary) {
    // Include solid fa icons
    faIconLibrary.addIcons(fasAt, fasAsterisk, fasEye, fasEyeSlash, fasExclamationCircle);
    // Include regular fa icons
    // Include brand fa icons
  }
}
