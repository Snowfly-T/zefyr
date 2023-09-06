/**
 * Returns true if the value is an object. (i.e. not a primitive)
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isObject({}); // => true
 * isObject([]); // => true
 * isObject(() => {}); // => true
 * isObject(/a/); // => true
 * isObject(new Number(0)); // => true
 * isObject(new String('')); // => true
 * isObject(''); // => false
 * isObject('a'); // => false
 * isObject(0); // => false
 * isObject(false); // => false
 * isObject(null); // => false
 * isObject(undefined); // => false
 * ```
 *
 * @see {@link isPrimitive}
 */
const isObject = (value: unknown): value is object =>
  (typeof value === 'object' && value !== null) || typeof value === 'function';

export default isObject;
