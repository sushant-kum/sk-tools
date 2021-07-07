export interface IApplication {
  key: string;
  name: string;
  hostname: string;
}

export interface IApplications {
  [key: string]: IApplication;
}
