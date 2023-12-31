/**
 * Returns `true` if the values are the same value (using `Object.is`).
 * @param a The first value.
 * @param b The second value.
 *
 * @example
 * ```typescript
 * // Case 1: Evaluation result is the same as using `===`
 * is(25, 25); // => true
 * is('foo', 'foo'); // => true
 * is('foo', 'bar'); // => false
 * is(null, null); // => true
 * is(undefined, undefined); // => true
 * is(globalThis, globalThis); // => true
 * is([], []); // => false
 * const foo = { a: 1 };
 * const bar = { a: 1 };
 * const sameFoo = foo;
 * is(foo, foo); // => true
 * is(foo, bar); // => false
 * is(foo, sameFoo); // => true
 * ```
 *
 * @example
 * ```typescript
 * // Case 2: Signed zero
 * is(0, -0); // => false
 * is(+0, -0); // => false
 * is(-0, -0); // => true
 * ```
 *
 * @example
 * ```typescript
 * // Case 3: NaN
 * is(NaN, 0 / 0); // => true
 * is(NaN, Number.NaN); // => true
 * ```
 *
 * @see {@link Object.is}
 */
const is: {
  <T>(a: unknown, b: T): a is T;
  <T>(b: T): (a: unknown) => a is T;
} = ((...args: unknown[]) =>
  args.length === 1 ? (a: unknown) => Object.is(a, args[0]) : Object.is(args[0], args[1])) as {
  <T>(b: T): (a: unknown) => a is T;
  <T>(a: unknown, b: T): a is T;
};

export default is;
