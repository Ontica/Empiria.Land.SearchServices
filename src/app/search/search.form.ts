/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

import { DocumentItemType, SearchResultDataItem } from './models/models';
import { SearchService } from './search.service';

interface SearchData {
  type: DocumentItemType;
  uid: string;  
}

@Component({
  selector: 'emp-land-search-form',
  templateUrl: 'search.form.html',
  providers: [SearchService]
})
export class SearchFormComponent implements OnInit {

  searchDocument: SearchData = { type: 0, uid: ''}
  DocumentItemType = DocumentItemType;  
  selectedDocumentItemName = 'Consultar';
  document: SearchResultDataItem[];  
  itemHash = '';
  msg = '';
  hasError = false;
  errorMessage = '';
  private subscription: any;


  constructor(private router: Router, private route: ActivatedRoute,
              private searchService: SearchService) { }


  ngOnInit() {
       
    this.getDocument();

  }


  onSelectDocumentItem(selectedValue: string) {   
    this.searchDocument.type =  Number(selectedValue);
    this.selectedDocumentItemName = this.getSelectedItemName();
  }


  getSelectedItemName(): string {   
    switch(this.searchDocument.type) {
    
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


  onSearchDocument(): void {
    this.hasError = false;
    this.document = [];

    if (!this.validate()) {
      return;
    }    
    
    this.searchService.getDocument(this.searchDocument.type, this.searchDocument.uid)
      .subscribe(
        x => this.document = x,
        err => this.showErrorMessage(err)
    );

  }


  clearForm(): void {    
    this.searchDocument.type = 0;
    this.searchDocument.uid  = '';
    this.document = [];
    this.hasError = false;
    this.selectedDocumentItemName = this.getSelectedItemName();
    this.router.navigate(['/'], { queryParams: {} });
  }


  onElectronicDelivery() {    
    
    this.searchService.getElectronicDelivery(this.searchDocument.uid, this.itemHash, this.msg)
      .subscribe(
        x => this.document = x,
        err => this.showErrorMessage(err)
      );

  }


  // private methods


  private getDocument(): void {

    const docType = this.route.snapshot.queryParamMap.get('type') || 'empty';
    this.searchDocument.type = (DocumentItemType as any)[docType];

    this.searchDocument.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    this.itemHash = this.route.snapshot.queryParamMap.get('hash') || undefined;      
    this.msg = this.route.snapshot.paramMap.get('msg') || '';

    this.selectedDocumentItemName = this.getSelectedItemName();
    this.onSearchDocument();

  }


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


  private validate(): boolean {
    if (this.searchDocument.type === DocumentItemType.empty) {
      return false;
    }
    if (this.searchDocument.uid.length === 0) {
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
    switch (this.searchDocument.type) {
      case DocumentItemType.resource:
        if (this.searchDocument.uid.length !== 19 && this.searchDocument.uid.length !== 14) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.transaction:
        if (this.searchDocument.uid.length !== 14 && this.searchDocument.uid.length !== 16) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.certificate:
        if (this.searchDocument.uid.length !== 20) {
          this.showValidatePatternsError();
          return false;
        }
        break;

      case DocumentItemType.document:
        if (this.searchDocument.uid.length !== 20) {
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
