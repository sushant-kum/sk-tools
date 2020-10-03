import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { StringInnerHTML } from '@libs/frontend/utils';

import { SnackbarData } from '../../data-models/snackbar-data';

@Component({
  selector: 'utils-snackbar-template',
  templateUrl: './snackbar-template.component.html',
  styleUrls: ['./snackbar-template.component.scss'],
})
export class SnackbarTemplateComponent implements OnInit {
  message: SnackbarData['message'];
  type: SnackbarData['type'];
  action: SnackbarData['action'];

  constructor(
    public snackbar_ref: MatSnackBarRef<SnackbarTemplateComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private _data: SnackbarData
  ) {}

  ngOnInit() {
    this.message = this._data.message;
    this.type = this._data.type;
    this.action = this._data.action;
  }

  /**
   * Check if the message paramenter is of valid `StringInnerHTML` type
   *
   * @author Sushant Kumar<sushant.kumar@soroco.com>
   * @returns {boolean}
   */
  isMessageInnerHtml(): boolean {
    if ((this.message as StringInnerHTML).innerHTML) {
      return true;
    }
    return false;
  }

  /**
   * Cast message to `StringInnerHTML`
   *
   * @author Sushant Kumar<sushant.kumar@soroco.com>
   * @returns {StringInnerHTML}
   */
  messageAsInnerHTML(): StringInnerHTML {
    return this.message as StringInnerHTML;
  }
}
