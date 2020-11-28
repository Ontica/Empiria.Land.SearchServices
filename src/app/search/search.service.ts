/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { SearchResultDataItem } from './models/search-result-data-item';

import { SearchApiHttpProvider } from './providers/search-api.http.provider';


export enum DocumentItemType {
  empty = 0,
  resource = 1,
  transaction = 2,
  certificate = 4,
  document = 8
}

@Injectable()
export class SearchService {

  constructor(private provider: SearchApiHttpProvider) { }


  electronicDelivery(uid: string, hashcode: string, msg: string): Promise<SearchResultDataItem[]> {    

    return this.provider.getElectronicDeliver(uid, hashcode, msg).toPromise();
  }


  getDocument(documentType: DocumentItemType, uid: string,
              hashcode: string, msg: string): Promise<SearchResultDataItem[]> {

    const dataOperationUID = this.getOperationName(documentType);     
      
    return this.getList(dataOperationUID,uid);   
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

  private getList(dataOperationUID: string, uid: string ): Promise<SearchResultDataItem[]> {
    switch (dataOperationUID) {

      case 'getResource':
        return this.provider.getResource(uid).toPromise();

      case 'getTransaction':
        return this.provider.getTransaction(uid).toPromise();

      case 'getCertificate':
        return this.provider.getCertificate(uid).toPromise();

      case 'getDocument':
        return this.provider.getDocument(uid).toPromise();

      default:
        throw new Error('Invalid document type');
    }

  }

}
