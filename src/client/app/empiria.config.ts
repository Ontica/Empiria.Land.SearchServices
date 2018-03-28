/**
 *  Solution : Empiria Land Search Services                             || v0.1.1023
 *  Type     : ConfigData
 *  Summary  : Internal type used to hold testing configuration data.
 *
 *  Copyright (c) 2015-2016. Ontica LLC, La Vía Óntica SC and contributors. <http://ontica.org>
*/


import { DataOperationDef } from './shared/services/data.operation';

const DefaultDataServer = 'http://registropublico.tlaxcala.gob.mx/services/';

const DataOperationList: DataOperationDef[] = [
  {
    uid: 'getResource', url: 'v1/online-services/resources/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getTransaction', url: 'v1/online-services/transactions/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getCertificate', url: 'v1/online-services/certificates/{0}?hash={1}', method: 'get',
    description: '', typeName: '', typeOperation: ''
  },
  {
    uid: 'getDocument', url: 'v1/online-services/documents/{0}?[hash={1}]', method: 'get',
    description: '', typeName: '', typeOperation: ''
  }

];

export const APP_SETTINGS = {
  'defaultDataServer': DefaultDataServer,
  'apiKey': '5psEHmJ4hAF78F4GTFZmifMPHzPTFqNAF32bgz3nZyiW1csLHfVOlvrQU6yplbNO',
  'initialOperations': DataOperationList,
  'displayVedaElectoralUI': true
};
