import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarTemplateComponent } from './components/snackbar-template/snackbar-template.component';
import { SnackbarData } from './data-models/snackbar-data';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _mat_snack_bar: MatSnackBar) {}

  show(
    message: SnackbarData['message'],
    type?: SnackbarData['type'],
    action?: SnackbarData['action'],
    config?: SnackbarData['config']
  ): MatSnackBarRef<SnackbarTemplateComponent> {
    const mat_snackbar_config: MatSnackBarConfig = config !== undefined ? config : {};
    mat_snackbar_config.panelClass =
      mat_snackbar_config.panelClass !== undefined ? mat_snackbar_config.panelClass : 'snackbar-panel';

    mat_snackbar_config.data = {
      message,
      type,
      action,
    };

    const snackbar_ref: MatSnackBarRef<SnackbarTemplateComponent> = this._mat_snack_bar.openFromComponent(
      SnackbarTemplateComponent,
      mat_snackbar_config
    );

    return snackbar_ref;
  }

  closeAll(): void {
    this._mat_snack_bar.dismiss();
  }
}
