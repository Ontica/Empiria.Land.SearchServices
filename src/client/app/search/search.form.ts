import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService, DocumentItemType } from './search.service';
import { PropertyItem } from '../shared/services/propertyItem';
import 'rxjs/Rx';


@Component({
  moduleId: module.id,
  selector: 'search-form',
  templateUrl: 'search.form.html',

  providers: [SearchService]
})

export class SearchForm implements OnInit {

  public DocumentItemType = DocumentItemType;
  public selectedDocumentItemType = 0;
  public selectedDocumentItemName = 'Buscar';
  public document: PropertyItem[];
  public itemUID = '';
  public itemHash = '';
  public hasError = false;
  public errorMessage = '';
  private subscription: any;


  constructor(private router: Router, private searchService: SearchService) {

  }


  ngOnInit() {
    this.subscription = this.router.routerState.root.queryParams.subscribe(params => {
      let docType = params['type'] || 'empty';
      this.selectedDocumentItemType = (<any>DocumentItemType)[docType];
      this.itemUID = params['uid'] || '';
      this.itemHash = params['hash'] || undefined;
      this.selectedDocumentItemName = this.getSelectedItemName();
      this.searchDocument();
    });

  }


  public setDocumentItem(selectedValue: string): void {
    this.selectedDocumentItemType = Number(selectedValue);
    this.selectedDocumentItemName = this.getSelectedItemName();
  }


  public getSelectedItemName(): string {
    switch (this.selectedDocumentItemType) {
      case DocumentItemType.empty:
        return 'Buscar';

      case DocumentItemType.resource:
        return 'Folio real';

      case DocumentItemType.transaction:
        return 'Número de trámite';

      case DocumentItemType.certificate:
        return 'Número de certificado';

      case DocumentItemType.document:
        return 'Número de sello registral';

      default:
        return '';
    }
  }


  public searchDocument(): void {
    this.hasError = false;
    this.document = [];

    if (!this.validate()) {
      return;
    }

    this.searchService.getDocument(this.selectedDocumentItemType, this.itemUID, this.itemHash)
      .then(x => this.setDocument(x))
      .catch(x => this.showErrorMessage(x));

  }


  public clearForm(): void {
    this.selectedDocumentItemType = 0;
    this.itemUID = '';
    this.document = [];
    this.hasError = false;
    this.selectedDocumentItemName = this.getSelectedItemName();
    this.router.navigate(['/'], { queryParams: {} });
  }


  private showErrorMessage(error: any): void {
    this.hasError = true;
    this.errorMessage = (<string>error.errorMessage).replace(/\n/g, '<br />');
  }


  private setDocument(document: PropertyItem[]): void {
    this.document = document;
  }


  private validate(): boolean {
    if (this.selectedDocumentItemType === DocumentItemType.empty) {
      return false;
    }
    if (this.itemUID.length === 0) {
      this.hasError = true;
      this.errorMessage = 'El ' + this.selectedDocumentItemName + ' se encuentra en blanco.';
      return false;
    }
    if (!this.validatePatterns()) {
      return false;
    }
    return true;
  }


  private validatePatterns(): boolean {
    switch (this.selectedDocumentItemType) {
      case DocumentItemType.resource:
        if (this.itemUID.length !== 19 && this.itemUID.length !== 14) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.transaction:
        if (this.itemUID.length !== 14 && this.itemUID.length !== 16) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.certificate:
        if (this.itemUID.length !== 20) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.document:
        if (this.itemUID.length !== 20) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      default:
        return false;
    }  // switch

    return true;
  }


  private showValidatePatternsError(): void {
    this.hasError = true;
    this.errorMessage = 'El ' + this.selectedDocumentItemName.toLowerCase() +
      ' no tiene un formato correcto. Favor de revisarlo e intentarlo nuevamente.';
  }


}  // class SearchForm
