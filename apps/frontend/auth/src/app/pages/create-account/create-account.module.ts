import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft as fasArrowLeft,
  faAsterisk as fasAsterisk,
  faAt as fasAt,
  faCopy as fasCopy,
  faExclamationCircle as fasExclamationCircle,
  faExclamationTriangle as fasExclamationTriangle,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
  faFileDownload as fasFileDownload,
  faFlag as fasFlag,
  faPhoneAlt as fasPhoneAlt,
  faUser as fasUser,
} from '@fortawesome/free-solid-svg-icons';

import { DisableControlDirective } from '@libs/frontend/utils/directives';
import { IpGeolocationModule } from '@libs/frontend/utils/services/ip-geolocation';
import { SnackbarModule } from '@libs/frontend/utils/services/snackbar';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountService } from './services/create-account/create-account.service';

@NgModule({
  declarations: [CreateAccountComponent, DisableControlDirective],
  imports: [
    // Angular imports
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Angular material imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTooltipModule,
    ClipboardModule,

    // Fontawesome imports
    FontAwesomeModule,

    // Inbuild imports
    IpGeolocationModule,
    SnackbarModule,
    CreateAccountRoutingModule,
  ],
  providers: [CreateAccountService],
})
export class CreateAccountModule {
  constructor(faIconLibrary: FaIconLibrary) {
    // Include solid fa icons
    faIconLibrary.addIcons(
      fasUser,
      fasAt,
      fasFlag,
      fasPhoneAlt,
      fasAsterisk,
      fasEye,
      fasEyeSlash,
      fasExclamationCircle,
      fasArrowLeft,
      fasFileDownload,
      fasCopy,
      fasExclamationTriangle
    );
    // Include regular fa icons
    // Include brand fa icons
  }
}
