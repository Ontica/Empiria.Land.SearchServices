/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

 import { DataOperationDef } from './data.operation';
 import { APP_SETTINGS } from '../../../assets/empiria.config';

 export class DataSettingsDef {

  defaultServer: string;
  apiKey: string;
  initialOperations: DataOperationDef[];

}

 export class DataSettings {

  private static instance: DataSettings = new DataSettings();

  settings: DataSettingsDef;

  //  Public methods

  static getOperations(): DataOperationDef[] {
    return DataSettings.instance.settings.initialOperations;
  }


  static getDefaultServer(): string {
    return DataSettings.instance.settings.defaultServer;
  }


  // Private methods

  private constructor() {
    this.settings = new DataSettingsDef();
    this.loadInitialValues();
  }


  private loadInitialValues(): void {
    const dataSettings = new DataSettingsDef();

    dataSettings.defaultServer = APP_SETTINGS.defaultDataServer;
    dataSettings.apiKey = APP_SETTINGS.apiKey;
    dataSettings.initialOperations = APP_SETTINGS.initialOperations;
    this.settings = dataSettings;
  }

}