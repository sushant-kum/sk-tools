import { CommonModule } from '@angular/common';
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
  faAsterisk as fasAsterisk,
  faAt as fasAt,
  faExclamationCircle as fasExclamationCircle,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
  faFlag as fasFlag,
  faPhoneAlt as fasPhoneAlt,
  faUser as fasUser,
} from '@fortawesome/free-solid-svg-icons';

import { DisableControlDirective } from '@libs/frontend/utils/directives';
import { IpGeolocationModule } from '@libs/frontend/utils/services/ip-geolocation';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';

@NgModule({
  declarations: [CreateAccountComponent, DisableControlDirective],
  imports: [
    // Angular imports
    CommonModule,
    ReactiveFormsModule,

    // Angular material imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTooltipModule,

    // Fontawesome imports
    FontAwesomeModule,

    // Inbuild imports
    IpGeolocationModule,
    CreateAccountRoutingModule,
  ],
})
export class CreateAccountModule {
  constructor(fa_icon_library: FaIconLibrary) {
    // Include solid fa icons
    fa_icon_library.addIcons(
      fasUser,
      fasAt,
      fasFlag,
      fasPhoneAlt,
      fasAsterisk,
      fasEye,
      fasEyeSlash,
      fasExclamationCircle
    );
    // Include regular fa icons
    // Include brand fa icons
  }
}
