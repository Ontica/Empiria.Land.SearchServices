/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export enum DocumentItemType {
    empty = 0,
    resource = 1,
    transaction = 2,
    certificate = 4,
    document = 8
}


export class SearchResultDataItem {
    name: string;
    value: any;
    style: string;
    dataType: string;
}


export enum TriState {
    true = 1,
    false = 0,
    empty = -1
  }
  

  