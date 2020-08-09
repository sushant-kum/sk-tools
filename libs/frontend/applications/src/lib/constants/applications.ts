import { IApplications } from '../data-models/application';

export class Applications {
  private _applications: IApplications = {
    notes: {
      name: 'Notes',
      hostname: '',
    },
  };

  constructor() {}

  get applications(): IApplications {
    return this._applications;
  }
}
