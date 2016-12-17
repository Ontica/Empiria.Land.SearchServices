/**
 *  Solution : Empiria Core Client                             || v0.3.0625
 *  Type     : Empiria.Validate
 *  Summary  : Static library that validate conditions.
 *
 *  Copyright (c) 2015-2016. Ontica LLC, La Vía Óntica SC and contributors. <http://ontica.org>
*/

/** Static library that validate conditions.
  *
  *  @class Validate
  */
export class Validate {

  // #region Static methods

  /** Returns true if the object value is equal to null, undefined, NaN, an empty
      string or an empty object.
    * @param object The object to check its value.
    */
  public static hasValue(object: any): boolean {
    if (object === null || object === undefined || object === {} || isNaN(object) || object === '') {
      return false;
    }
    return true;
  }

  public static isEmail(value: string): boolean {
    if (!this.hasValue(value)) {
      return false;
    }
    let emailExp: string = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$';
    let regularExpresion = new RegExp(emailExp);
    let test = regularExpresion.test(value);
    return test;
  }

  public static isTrue(value: boolean): boolean {
    return value === true;
  }

  public static notNull(value: string): boolean {
    if ((value === null) || (value === undefined) || value === {}) {
      return false;
    }
    return true;
  }

  // #endregion Static methods

}  // class Validate
