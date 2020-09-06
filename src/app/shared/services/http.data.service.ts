/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataOperation } from './data.operation';

@Injectable()
export class HttpDataService {

  constructor(private http: HttpClient) {

  }

  getList<T>(dataOperation: DataOperation): Promise<T> {
    const url = dataOperation.getURI();

    return this.http.get(url)
      .toPromise()
      .then(response => response['data'] as T)
      .catch(this.handleError);
  }


  post<T>(dataOperation: DataOperation, body?: any): Promise<T> {
    const url = dataOperation.getURI();

    return this.http.post(url, body)
          .toPromise()
          .then(response => response['data'] as T)
          .catch(this.handleError);
  }

  // private methods

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.error.data || error);
  }

}