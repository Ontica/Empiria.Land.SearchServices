import { DataOperationDef } from './data.operation';

export class DataSettingsDef {

  defaultServer: string;
  apiKey: string;
  dataOperations: DataOperationDef[];

}

const servicesServer = 'http://registropublico.tlaxcala.gob.mx/services/';

const OperationList: DataOperationDef[] = [
  {
    uid: 'getResource', url: 'v1/online-services/resources/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getTransaction', url: 'v1/online-services/transactions/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getCerficate', url: 'v1/online-services/certificates/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getDocument', url: 'v1/online-services/documents/{0}?[hash={1}]', method: 'get',
    description: '', typeName: '', typeOperation: ''
  }

];

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
    this.settings.defaultServer = servicesServer;
    this.settings.apiKey = '';
    this.settings.dataOperations = OperationList;

  }

  // endregion Private methods

}
