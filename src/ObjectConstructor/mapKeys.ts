import type { StrictKeys } from './keysS';
import type { StrictValues } from './valuesS';

/**
 * Calls a defined callback function on each key of an object, and returns an object that contains the results.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each key/value pair in the object.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
 * mapKeys(obj, (key) => `${key}_`); // => { '5_': 42, 'a_': 1, 'b_': 2 }
 * const mapped = mapKeys(obj, (key) => `${key}_`); // mapped :: { '5_': number, 'a_': number, 'b_': number }
 * ```
 */
const mapKeys = <const O extends object, R extends string>(
  o: O,
  callbackfn: (key: StrictKeys<O>[number], index: number, object: O) => R,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any,
): { [P in R]: StrictValues<O>[number] } => {
  const keys = Object.keys(o);
  const mappedKeys = keys.map(function (this: unknown, key, index) {
    return callbackfn.call(this, key as StrictKeys<O>[number], index, o);
  }, thisArg);
  return Object.fromEntries(mappedKeys as never) as {
    [P in R]: StrictValues<O>[number];
  };
};

export default mapKeys;