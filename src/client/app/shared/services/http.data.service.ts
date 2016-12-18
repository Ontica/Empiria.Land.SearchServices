import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DataOperation } from './data.operation';

import 'rxjs/add/operator/toPromise';

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
