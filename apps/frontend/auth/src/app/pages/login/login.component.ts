import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Applications, IApplication, IApplications } from '@libs/frontend/applications';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _applications: IApplications = new Applications().applications;

  application: IApplication;
  form_login: FormGroup;
  password_visible: boolean;

  constructor(private _route: ActivatedRoute) {
    this.form_login = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.password_visible = false;
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.application = this._applications[params['application']];
    });
  }

  togglePasswordVisibility(): void {
    this.password_visible = !this.password_visible;
  }
}
