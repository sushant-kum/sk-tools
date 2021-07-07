import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { StringInnerHTML } from '@libs/frontend/utils';

export type SnackbarType = 'success' | 'warning' | 'error' | 'info';

export interface SnackbarData {
  message: string | StringInnerHTML;
  type: SnackbarType;
  action: string;
  config?: MatSnackBarConfig;
}
