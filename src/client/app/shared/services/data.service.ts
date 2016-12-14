import { Injectable } from '@angular/core';

import { HttpDataService } from './http.data.service';

import { DataOperation } from './data.operation';

import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private httpDataService: HttpDataService) {

  }

  // region Public methods

  public getList<T>(dataOperation: DataOperation): Promise<T> {
    return this.httpDataService.getList<T>(dataOperation);
  }

  // endregion Public methods

  // region Private methods

  // endregion Private methods

}
