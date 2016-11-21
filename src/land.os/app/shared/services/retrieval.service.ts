import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PropertyItem } from './propertyItem';

export enum DocumentItemType {
  empty = 0,
  resource = 1,
  transaction = 2,
  certificate = 4,
  document = 8
}

@Injectable()
export class RetrievalService {

  constructor(private http: Http) {

  }

  // region Public methods

  public getDocument(documentType: DocumentItemType, uid: string, hashcode: string): Promise<PropertyItem[]> {
    const endpoint = this.getServiceEndpoint(documentType);

    return this.getPropertyItems(endpoint, uid,  hashcode);
  }

  // endregion Public methods

  // region Private methods

  private getPropertyItems(endpoint: string, uid:string, hashcode: string): Promise<PropertyItem[]> {
    const servicesServer = 'http://registropublico.tlaxcala.gob.mx/services/';

    let url = servicesServer + endpoint + uid + (hashcode ? '?hash=' + hashcode : '');

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as PropertyItem[])
      .catch(this.handleError);
  }

  private getServiceEndpoint(documentType: DocumentItemType): string {
    switch (documentType) {

      case DocumentItemType.resource:
        return 'v1/online-services/resources/';

      case DocumentItemType.transaction:
        return 'v1/online-services/transactions/';

      case DocumentItemType.certificate:
        return 'v1/online-services/certificates/';

      case DocumentItemType.document:
        return 'v1/online-services/documents/';

      default:
         throw 'Invalid document type';
    }

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json().data || error.message);
  }

  // endregion Private methods

}
