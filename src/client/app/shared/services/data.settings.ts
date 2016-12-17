import { DataOperationDef } from './data.operation';
import { APP_SETTINGS } from './../../empiria.config';

export class DataSettingsDef {

  defaultServer: string;
  apiKey: string;
  dataOperations: DataOperationDef[];

}

export class DataSettings {

  private settings: DataSettingsDef;

  // region Public methods

  public static getOperations(): DataOperationDef[] {
    let initial = new DataSettings();
    return initial.settings.dataOperations;
  }

  public static getServer(): string {
    let aux = new DataSettings();
    return aux.settings.defaultServer;
    //   return this.settings.defaultServer;
  }

  // endregion Public methods

  // region Private methods

  private constructor() {
    this.settings = new DataSettingsDef();
    this.setInitialValues();
  }

  private setInitialValues() {
    this.settings.defaultServer = APP_SETTINGS.defaultDataServer;
    this.settings.apiKey = APP_SETTINGS.apiKey;
    this.settings.dataOperations = APP_SETTINGS.initialOperations;

  }

  // endregion Private methods

}
