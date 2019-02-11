/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { HttpDataService } from './http.data.service';

import { DataOperation } from './data.operation';

@Injectable()
export class DataService {

  constructor(private httpDataService: HttpDataService) { }


  getList<T>(dataOperation: DataOperation): Promise<T> {
    return this.httpDataService.getList<T>(dataOperation);
  }


  execute<T>(dataOperation: DataOperation, body?: any): Promise<T> {
    return this.httpDataService.post<T>(dataOperation, body);
  }

}
