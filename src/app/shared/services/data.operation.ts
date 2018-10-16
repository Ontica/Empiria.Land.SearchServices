/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DataSettings } from './data.settings';
import { Assertion } from './assertion';

export interface DataOperationDef {
  uid: string;
  url: string;
  method: string;
  description?: string;
  typeName?: string;
  typeOperation: string;

}

export class DataOperation {

  private static DEFINED_OPERATIONS: DataOperationDef[];

  private definition: DataOperationDef;
  private parsedURI: string = '';

  // region Constructors and parsers

  private constructor(definition: DataOperationDef, parameters: any[]) {
    this.definition = definition;
    this.parsedURI = DataOperation.getParsedURI(this.definition, parameters);
  }

  public static parse(dataOperationUID: string, ...parameters: any[]): DataOperation {
    Assertion.assertValue(dataOperationUID, 'dataOperationUID');

    let definition = DataOperation.parseDataOperationDef(dataOperationUID);

    return new DataOperation(definition, parameters);
  }

  private static parseDataOperationDef(dataOperationUID: string): DataOperationDef {
    DataOperation.assertDEFINED_OPERATIONSLoaded();

    let foundedItems = DataOperation.DEFINED_OPERATIONS.filter((x) => x.uid === dataOperationUID);

    if (foundedItems.length === 0) {
      throw 'DataOperation ' + dataOperationUID + ' is undefined.';
    }

    return foundedItems[0];
  }

  private static assertDEFINED_OPERATIONSLoaded(): void {
    if (!DataOperation.DEFINED_OPERATIONS) {
      DataOperation.DEFINED_OPERATIONS = DataSettings.getOperations();
    }
  }

  // endregion Constructors and parsers

  // region Public methods


  public getURI(): string {
    let servicesServer = DataSettings.getDefaultServer();

    return servicesServer + this.parsedURI;
  }

  // endregion Public methods

  // region Auxiliary methods

  private static getParsedURI(definition: DataOperationDef, parameters: any[]): string {
    parameters = parameters || [];

    let url = definition.url;

    for (let i = 0; i < parameters.length; i++) {
      url = url.replace('{' + i.toString() + '}', parameters[i]);
    }

    url = DataOperation.formatParameters(url);

    return url;
  }

  private static formatParameters(url: string): string {
    //replace []
    url = url.replace(new RegExp('(\\[)|(\\])', 'g'), '');
    //replace parameter=null or paramater={number} or parameter=undefined
    url = url.
      replace(new RegExp('([A-Za-z0-9\-]+=((undefined)|(null)|({[0-9]})))', 'g'), '');
    //replace && &&& &...&&&
    url = url.replace(new RegExp('(&)\\1+', 'g'), '&');
    //replace &?
    url = url.replace(new RegExp('\\?&'), '?');
    //replace ? at end or & at end
    url = url.replace(new RegExp('(\\?$)|(&$)'), '');

    return url;
  }

  // endregion Auxiliary methods

}
