/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {  DocumentItemType, SearchResultDataItem } from './models/models';

import { SearchApiHttpProvider } from './providers/search-api.http.provider';

@Injectable()
export class SearchService {

  constructor(private provider: SearchApiHttpProvider) { }


  getElectronicDelivery(uid: string, hashcode: string, msg: string): Observable<SearchResultDataItem[]> {    

    return this.provider.getElectronicDeliver(uid, hashcode, msg);
  }


  getDocument(documentType: DocumentItemType, uid: string): Observable<SearchResultDataItem[]> {

    const dataOperationUID = this.getOperationName(documentType);     
      
    return this.getOperation(dataOperationUID,uid);   
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

  private getOperation(dataOperationUID: string, uid: string ): Observable<SearchResultDataItem[]> {
    switch (dataOperationUID) {

      case 'getResource':
        return this.provider.getResource(uid); 

      case 'getTransaction':
        return this.provider.getTransaction(uid);

      case 'getCertificate':
        return this.provider.getCertificate(uid);

      case 'getDocument':
        return this.provider.getDocument(uid);

      default:
        throw new Error('Invalid document type');
    }

  }

}
