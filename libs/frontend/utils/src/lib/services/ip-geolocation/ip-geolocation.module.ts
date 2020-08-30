import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { IpGeolocationService } from './ip-geolocation.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [IpGeolocationService],
})
export class IpGeolocationModule {}
