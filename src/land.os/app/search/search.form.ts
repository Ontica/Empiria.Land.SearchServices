import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RetrievalService } from '../shared/services/retrieval.service';

import { PropertyItem } from '../shared/services/propertyItem';
import 'rxjs/Rx';


export enum DocumentItemType {
  empty = 0,
  landResources = 1,
  landTransaction = 2,
  landCertificate = 3,
  recordingDocument = 4
}

@Component({
  moduleId: module.id,
  selector: 'search-form',
  templateUrl: 'search.form.html',

  providers: [RetrievalService]
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

  constructor(private retrievalService: RetrievalService, private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.router.routerState.queryParams.subscribe(params => {
      let docType = params['type'] || 'empty';
      this.selectedDocumentItemType = (<any>DocumentItemType)[docType];
      this.itemUID = params['uid'] || '';
      this.itemHash = params['hash'] || '';
      this.selectedDocumentItemName = this.getSelectedItemName();
      this.searchDocument();
    });

  }

  public setDocumentItem(selectedValue: string): void {
    this.selectedDocumentItemType = Number(selectedValue);
    this.selectedDocumentItemName = this.getSelectedItemName();
  }

  public getSelectedItemName(): string {
    switch (this.DocumentItemType[this.selectedDocumentItemType]) {
      case 'empty':
        return 'Buscar';
      case 'landResources':
        return 'Folio real';
      case 'landTransaction':
        return 'Número de trámite';
      case 'landCertificate':
        return 'Número de certificado';
      case 'recordingDocument':
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

    switch (this.DocumentItemType[this.selectedDocumentItemType]) {
      case 'empty':
        return;

      case 'landResources':
        this.retrievalService.getResources(this.itemUID)
          .then(x => this.setDocument(x))
          .catch(x => this.showErrorMessage(x));
        return;

      case 'landTransaction':
        this.retrievalService.getTransaction(this.itemUID)
          .then(x => this.setDocument(x))
          .catch(x => this.showErrorMessage(x));
        return;

      case 'landCertificate':
        this.retrievalService.getCertificate(this.itemUID)
          .then(x => this.setDocument(x))
          .catch(x => this.showErrorMessage(x));
        return;

      case 'recordingDocument':
        this.retrievalService.getDocument(this.itemUID)
          .then(x => this.setDocument(x))
          .catch(x => this.showErrorMessage(x));
        return;

      default:
        return;
    }
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
    this.errorMessage = (<string> error.errorMessage).replace(/\n/g, '<br />');
  }


  private setDocument(document: PropertyItem[]): void {
    this.document = document;
  }


  private validate(): boolean {
    if (this.DocumentItemType[this.selectedDocumentItemType] === 'empty') {
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
    switch (this.DocumentItemType[this.selectedDocumentItemType]) {
      case 'landResources':
        if (this.itemUID.length !== 19) {
          this.showValidatePatternsError();
          return false;
        }
        break;
      case 'landTransaction':
        if (this.itemUID.length !== 14) {
          this.showValidatePatternsError();
          return false;
        }
        break;
      case 'landCertificate':
        if (this.itemUID.length !== 20) {
          this.showValidatePatternsError();
          return false;
        }
        break;
      case 'recordingDocument':
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
    this.errorMessage = 'El ' + this.selectedDocumentItemName +
                        ' no tiene un formato correcto.<br />Favor de revisarlo e intentarlo nuevamente.';
  }

}  // class SearchForm