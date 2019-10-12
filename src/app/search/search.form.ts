/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService, DocumentItemType } from './search.service';
import { PropertyItem } from '../shared/services/propertyItem';


@Component({
  selector: 'emp-land-search-form',
  templateUrl: 'search.form.html',
  providers: [SearchService]
})
export class SearchFormComponent implements OnInit {

  DocumentItemType = DocumentItemType;
  selectedDocumentItemType = 0;
  selectedDocumentItemName = 'Consultar';
  document: PropertyItem[];
  itemUID = '';
  itemHash = '';
  msg = '';
  hasError = false;
  errorMessage = '';
  private subscription: any;


  constructor(private router: Router,
              private searchService: SearchService) { }


  ngOnInit() {
    this.subscription = this.router.routerState.root.queryParams.subscribe(params => {
      const docType = params.type || 'empty';
      this.selectedDocumentItemType = (DocumentItemType as any)[docType];
      this.itemUID = params.uid || '';
      this.itemHash = params.hash || undefined;
      this.msg = params.msg || '';
      this.selectedDocumentItemName = this.getSelectedItemName();
      this.searchDocument();
    });

  }


  setDocumentItem(selectedValue: string) {
    this.selectedDocumentItemType = Number(selectedValue);
    this.selectedDocumentItemName = this.getSelectedItemName();
  }


  getSelectedItemName(): string {
    switch (this.selectedDocumentItemType) {
      case DocumentItemType.empty:
        return 'Consultar';

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


  searchDocument(): void {
    this.hasError = false;
    this.document = [];

    if (!this.validate()) {
      return;
    }

    this.searchService.getDocument(this.selectedDocumentItemType, this.itemUID, this.itemHash, this.msg)
      .then(x => this.setDocument(x))
      .catch(err => this.showErrorMessage(err));

  }


  clearForm(): void {
    this.selectedDocumentItemType = 0;
    this.itemUID = '';
    this.document = [];
    this.hasError = false;
    this.selectedDocumentItemName = this.getSelectedItemName();
    this.router.navigate(['/'], { queryParams: {} });
  }


  onElectronicDelivery() {
    this.searchService.electronicDelivery(this.itemUID, this.itemHash, this.msg)
      .then(x => this.setDocument(x))
      .catch(err => this.showErrorMessage(err));
  }


  // private methods


  private showErrorMessage(error: any): void {
    this.hasError = true;

    if (!error) {
      this.errorMessage = 'Tuve un problema al ejecutar la operación.';
    } else if (error.errorMessage) {
      this.errorMessage = (error.errorMessage as string).replace(/\n/g, '<br />');
    } else if (error.message) {
      this.errorMessage = (error.message as string).replace(/\n/g, '<br />');
    } else if (error.data) {
      this.errorMessage = error.data;
    }

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


}
