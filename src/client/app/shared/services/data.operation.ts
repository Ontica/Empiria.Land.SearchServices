export class DataOperationDef {
  uid: string = '';
  url: string = '';
  method: string = '';
  description?: string = '';
  typeName?: string = '';
  typeOperation: string = '';

  public static parse(uid: string): DataOperationDef {
    let dataDefinition = new DataOperationDef();

    dataDefinition.uid = uid;
    return dataDefinition;
  }
}

import { DataSettings } from './data.settings';

export class DataOperation {

  private definition: DataOperationDef;
  private operations: DataOperationDef[];



  // region Public methods

  public static parse(dataOperationUID: string, ...parameters: any[]): DataOperation {
    let dataOperation = new DataOperation(dataOperationUID);

    dataOperation.loadParameters(parameters);

    return dataOperation;
  }

  public getUrl(): string {
    return this.definition.url;
  }

  // endregion Public methods

  // region Private methods

  private constructor(dataOperationUID: string) {
    this.definition = DataOperationDef.parse(dataOperationUID);
    this.operations = DataSettings.getOperations();

  }

  private loadParameters(parameters: any[]): void {

    const servicesServer = DataSettings.getServer();
    let uidSettings = this.getUidSettings();

    this.definition.url = servicesServer + uidSettings.url;
    this.definition.method = uidSettings.method;
    this.definition.description = uidSettings.description;
    this.definition.typeName = uidSettings.typeName;
    this.definition.typeOperation = uidSettings.typeOperation;

    for (let i = 0; i < parameters.length; i++) {
      this.definition.url = this.definition.url.replace('{' + i.toString() + '}', parameters[i]);
    }
    this.formatParameters();

  }

  private formatParameters(): void {
    //replace []
    this.definition.url = this.definition.url.replace(new RegExp('(\\[)|(\\])', 'g'), '');
    //replace parameter=null or paramater={number}
    this.definition.url = this.definition.url.
      replace(new RegExp('([A-Za-z0-9\-]+=((undefined)|(null)|({[0-9]})))', 'g'), '');
    //replace && &&& &...&&&
    this.definition.url = this.definition.url.replace(new RegExp('(&)\\1+', 'g'), '&');

    this.definition.url = this.definition.url.replace(new RegExp('\\?&'), '?');
    //replace ? at end or & at end
    this.definition.url = this.definition.url.replace(new RegExp('(\\?$)|(&$)'), '');

  }

  private getUidSettings(): DataOperationDef {
    let operationSettings = this.operations.filter((x) => x.uid === this.definition.uid);
    if (operationSettings.length < 0) {
      throw 'Operation is undefined';
    }
    return operationSettings[0];
  }

  // endregion Private methods

}

