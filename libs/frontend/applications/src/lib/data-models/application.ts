export interface IApplication {
  name: string;
  hostname: string;
}

export interface IApplications {
  [key: string]: IApplication;
}
