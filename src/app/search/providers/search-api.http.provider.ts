/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Assertion } from '@app/core';
import { SearchResultDataItem } from '../models/search-result-data-item';


@Injectable()
export class SearchApiHttpProvider {

  constructor(private http: HttpService) { }

   getResource(uid :string): Observable<SearchResultDataItem[]> {
    Assertion.assertValue(uid, 'uid');    

    const path = `v1/online-services/resources/${uid}`;

    return this.http.get<SearchResultDataItem[]>(path);
   }


   getTransaction(uid :string): Observable<SearchResultDataItem[]> {
    Assertion.assertValue(uid, 'uid');

    const path = `v1/online-services/transactions/${uid}`;

    return this.http.get<SearchResultDataItem[]>(path);
   }


   getCertificate(uid :string): Observable<SearchResultDataItem[]> {
    Assertion.assertValue(uid, 'uid');

    const path = `v1/online-services/certificates/${uid}`;

    return this.http.get<SearchResultDataItem[]>(path);
   }


   getDocument(uid :string): Observable<SearchResultDataItem[]> {
    Assertion.assertValue(uid, 'uid');

    const path = `v1/online-services/documents/${uid}`;

    return this.http.get<SearchResultDataItem[]>(path);
   }


   getElectronicDeliver(uid: string, hashcode: string, msg: string): Observable<SearchResultDataItem[]> {
     Assertion.assertValue(uid, 'uid');
     Assertion.assertValue(hashcode, 'hashcode');
     Assertion.assertValue(msg, 'msg');

     const path =`v1/online-services/transactions/${uid}/electronic-delivery/?hash=${hashcode}&messageUID=${msg}`; 

     return this.http.post<SearchResultDataItem[]>(path);
   }

} 
