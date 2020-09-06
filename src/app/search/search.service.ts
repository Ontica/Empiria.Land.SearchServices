/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { DataOperation } from '../shared/services/data.operation';
import { DataService } from '../shared/services/data.service';
import { PropertyItem } from '../shared/services/propertyItem';

export enum DocumentItemType {
  empty = 0,
  resource = 1,
  transaction = 2,
  certificate = 4,
  document = 8
}

@Injectable()
export class SearchService {

  constructor(private dataService: DataService) { }


  electronicDelivery(uid: string, hashcode: string, msg: string): Promise<PropertyItem[]> {
    const dataOperation = DataOperation.parse('electronicDelivery', uid, hashcode, msg);

    return this.dataService.execute<PropertyItem[]>(dataOperation);
  }


  getDocument(documentType: DocumentItemType, uid: string,
              hashcode: string, msg: string): Promise<PropertyItem[]> {
    const dataOperationUID = this.getOperationName(documentType);
    const dataOperation = DataOperation.parse(dataOperationUID, uid, hashcode, msg);

    return this.dataService.getList<PropertyItem[]>(dataOperation);
  }

  // private methods

  private getOperationName(documentType: DocumentItemType): string {
    switch (documentType) {

      case DocumentItemType.resource:
        return 'getResource';

      case DocumentItemType.transaction:
        return 'getTransaction';

      case DocumentItemType.certificate:
        return 'getCertificate';

      case DocumentItemType.document:
        return 'getDocument';

      default:
        throw new Error('Invalid document type');
    }

  }

}