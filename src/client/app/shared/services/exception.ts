/**
 *  Solution : Empiria Core Client                             || v0.3.0625
 *  Type     : Empiria.Exception
 *  Summary  : Static library that allows assertion checking.
 *
 *  Copyright (c) 2015-2016. Ontica LLC, La Vía Óntica SC and contributors. <http://ontica.org>
*/

export interface ExceptionData {
  message: string;
  code?: string;
  name?: string;
  hint?: string;
  source?: string;
  issues?: string[];
  innerException?: any;
}

export class Exception extends Error {

  private _code: string = '';
  private _hint: string = '';
  private _source: string = '';
  private _trace: string = '';
  private _issues: string[] = [];
  private _innerException: any = {};

  public static throw(data: string | ExceptionData): void {
    let exception: Exception;

    if (typeof data === 'string') {
      exception = new Exception({ message: <string>data });
    } else {
      exception = new Exception(<ExceptionData>data);
    }
    console.log('There was a problem: ' + exception.message + '\n' + exception.toString());

    throw exception;
  }

  constructor(data: ExceptionData) {
    super(data.message);
    super.name = data.name || 'EmpiriaException';

    this._code = data.code || 'Unknown';
    this._hint = data.hint || '';
    this._source = data.source || '';
    this._issues = data.issues || [];
    this._innerException = data.innerException || {};

    super.message = data.message;   // Assign because there are ES6 issues yet
    // look at: https://github.com/Microsoft/TypeScript/issues/5069
    //          https://github.com/Microsoft/TypeScript/issues/1168
  }

  public get code(): string {
    return this._code;
  }

  public get hint(): string {
    return this._hint;
  }

  public get source(): string {
    return this._source;
  }

  public get issues(): string[] {
    return this._issues;
  }

  public get trace(): string {
    return this._trace;
  }

  public get innerException(): any {
    return this._innerException;
  }

  // Override of the toString method, in order to return a specific message.
  public toString(): string {
    let template = '  Code: {0}  Name: {1}  Source: {2}  Message: {3}  Hint: {4}' +
      '  Issues: {5}  InnerException: {6}  Trace: {7}';

    let parameters = [this.code, this.name, this.source, this.message, this.hint,
    this.issues.toString(), JSON.stringify(this._innerException), this.trace];

    for (let i = 0; i < parameters.length; i++) {
      template = template.replace('{' + i.toString() + '}', parameters[i].trim() + '\n');
    }
    return template;
  }

}  // class Exception
