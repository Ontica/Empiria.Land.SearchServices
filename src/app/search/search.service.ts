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

    switch (documentType) {

      case DocumentItemType.property:
      case DocumentItemType.association:
      case DocumentItemType.noproperty:
        return this.provider.getResource(uid);

      case DocumentItemType.transaction:
        return this.provider.getTransaction(uid);

      case DocumentItemType.certificate:
        return this.provider.getCertificate(uid);

      case DocumentItemType.document:
        return this.provider.getDocument(uid);

      default:
        throw new Error('Invalid document type');
    }
  }

}
