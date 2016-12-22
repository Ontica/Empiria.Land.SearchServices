import { Component } from '@angular/core';

import { SearchService, DocumentItemType } from './search.service';
import { PropertyItem } from '../shared/services/propertyItem';
import 'rxjs/Rx';

interface SearchData {
   type: DocumentItemType;
   uid: string;
   hash?: string;
}

@Component({
  moduleId: module.id,
  selector: 'search-kiosk-form',
  templateUrl: 'search-kiosk.form.html',

  providers: [SearchService]
})
export class SearchKioskForm {

  public document: PropertyItem[] = [];
  public searchText: string = '';
  public errorMessage = '';

  constructor(private searchService: SearchService) {

  }

  public onsearch(): void {
    if (this.searchText.length === 0) {
      return;
    }

    this.initialize();

    let data = this.tryGetSearchData(this.searchText);

    if (data !== null) {
      this.searchDocument(data);
    } else {
      this.errorMessage = 'No pude encontrar información con los datos proporcionados.';
    }
    this.searchText = '';
  }

  private initialize(): void {
    this.document = [];
    this.errorMessage = '';
  }

  private tryGetSearchData(value: string): SearchData {
    let searchData = this.tryGetUID(value);

    if (searchData === null) {
      return null;
    }

    searchData.hash = this.tryGetHash(value);

    return searchData;
  }

  private tryGetUID(value: string): SearchData {
    value = value.toUpperCase();

    let matched = value.match(/(UID=[\w\d-]*)\w*/g);

    let uid = '';

    if (matched && matched.length === 1) {
      uid = matched[0].replace('UID=', '');
    } else {
      uid = value;
    }

    matched = uid.match(/TR-\d\d[A-Z][A-Z]\d-\d[A-Z][A-Z]\d\d-\d/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.transaction,
        uid: matched[0],
      };
    }

    matched = uid.match(/TL\d\d[A-Z][A-Z]\d\d[A-Z][A-Z]\d\d-\d/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.transaction,
        uid: matched[0],
      };
    }

    matched = uid.match(/RP\d\d[A-Z][A-Z]-\d\d[A-Z][A-Z]\d\d-[A-Z][A-Z]\d\d[A-Z]\d/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.document,
        uid: matched[0],
      };
    }

    matched = uid.match(/CE\d\d[A-Z][A-Z]-\d\d[A-Z][A-Z]\d\d-[A-Z][A-Z]\d\d[A-Z][A-Z\d]/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.certificate,
        uid: matched[0],
      };
    }

    matched = uid.match(/TL-DOC-\d[A-Z]\d[A-Z]\d[A-Z]\d[A-Z\d]/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.resource,
        uid: matched[0],
      };
    }

    matched = uid.match(/TL-SC-[A-Z]\d[A-Z]\d[A-Z]\d\d[A-Z\d]/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.resource,
        uid: matched[0],
      };
    }

    matched = uid.match(/TL\d\d-[A-Z]\d[A-Z]\d-[A-Z][A-Z\d]\d[A-Z]-\d[A-Z]\d[A-Z\d]/g);
    if (matched && matched.length === 1) {
      return {
        type: DocumentItemType.resource,
        uid: matched[0],
      };
    }

    return null;
  }

  private tryGetHash(value: string): string {
    let matched = value.match(/(hash=[\w\d-]*)\w*/g);

    let hash: string = null;

    if (matched && matched.length === 1) {
      hash = matched[0].replace('hash=', '');
    }
    return hash;
  }

  private searchDocument(data: SearchData): void {
    this.document = [];

    this.searchService.getDocument(data.type,
                                   data.uid, data.hash)
                      .then(x => this.document = x)
                      .catch(x => this.showErrorMessage(x));
  }

  private showErrorMessage(error: any): void {
    this.errorMessage = (<string>error.errorMessage).replace(/\n/g, '<br />');
  }


}  // class SearchKioskForm
