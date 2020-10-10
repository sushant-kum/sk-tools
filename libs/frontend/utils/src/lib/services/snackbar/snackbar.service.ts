import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarTemplateComponent } from './components/snackbar-template/snackbar-template.component';
import { SnackbarData } from './data-models/snackbar-data';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _matSnackBar: MatSnackBar) {}

  show(
    message: SnackbarData['message'],
    type?: SnackbarData['type'],
    action?: SnackbarData['action'],
    config?: SnackbarData['config']
  ): MatSnackBarRef<SnackbarTemplateComponent> {
    const matSnackbarConfig: MatSnackBarConfig = config !== undefined ? config : {};
    matSnackbarConfig.panelClass =
      matSnackbarConfig.panelClass !== undefined ? matSnackbarConfig.panelClass : 'snackbar-panel';

    matSnackbarConfig.data = {
      message,
      type,
      action,
    };

    const snackbarRef: MatSnackBarRef<SnackbarTemplateComponent> = this._matSnackBar.openFromComponent(
      SnackbarTemplateComponent,
      matSnackbarConfig
    );

    return snackbarRef;
  }

  closeAll(): void {
    this._matSnackBar.dismiss();
  }
}
