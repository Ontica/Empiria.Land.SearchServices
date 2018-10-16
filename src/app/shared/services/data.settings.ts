import { DataOperationDef } from './data.operation';
import { APP_SETTINGS } from './../../empiria.config';

export class DataSettingsDef {

  defaultServer: string;
  apiKey: string;
  initialOperations: DataOperationDef[];

}

export class DataSettings {

  private static instance: DataSettings = new DataSettings();
  public settings: DataSettingsDef;

  // region Public methods

  public static getOperations(): DataOperationDef[] {
    return DataSettings.instance.settings.initialOperations;
  }

  public static getDefaultServer(): string {
    return DataSettings.instance.settings.defaultServer;
  }

  // endregion Public methods

  // region Private methods

  private constructor() {
    this.settings = new DataSettingsDef();
    this.loadInitialValues();
  }

  private loadInitialValues(): void {
    let dataSettings = new DataSettingsDef();

    dataSettings.defaultServer = APP_SETTINGS.defaultDataServer;
    dataSettings.apiKey = APP_SETTINGS.apiKey;
    dataSettings.initialOperations = APP_SETTINGS.initialOperations;
    this.settings = dataSettings;
  }

  // endregion Private methods

}
