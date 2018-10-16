/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DataOperation } from './data.operation';

@Injectable()
export class HttpDataService {

  constructor(private http: Http) {

  }

  // region Public methods

  public getList<T>(dataOperation: DataOperation): Promise<T> {
    let url = dataOperation.getURI();

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as T)
      .catch(this.handleError);
  }
  // endregion Public methods

  // region Private methods

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json().data || error.message);
  }

  // endregion Private methods

}
