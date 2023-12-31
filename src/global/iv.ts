import type { IsAny } from '../internal/types/assertion';
import type { ListOf } from '../internal/types/union';

export type MethodKey<T> = IsAny<T> extends true
  ? PropertyKey
  : [T] extends [never]
  ? never
  : T extends string
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TODO: Fix this
    | _MethodKey<
          string,
          ListOf<
            Exclude<
              keyof string,
              | 'capitalize'
              | 'isBlank'
              | 'isEmpty'
              | 'isNotBlank'
              | 'isNotEmpty'
              | 'reverse'
              | 'trimIndent'
            >
          >
        >
      | 'capitalize'
      | 'isBlank'
      | 'isEmpty'
      | 'isNotBlank'
      | 'isNotEmpty'
      | 'reverse'
      | 'trimIndent'
  : _MethodKey<T, ListOf<keyof T>>;
type _MethodKey<T, AS extends readonly PropertyKey[]> = AS extends readonly [infer A, ...infer B]
  ? A extends keyof T
    ? B extends readonly PropertyKey[]
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        T[A] extends () => any
        ? _MethodKey<T, B> | A
        : _MethodKey<T, B>
      : never
    : never
  : never;

/**
 * Returns a function that when given a value invokes the specified method. `iv` is short for "invoke".
 * @param name The method to get.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: () => 3 };
 * const objs = [{ a: 1, b: 2, c: () => 3 }, { a: 4, b: 5, c: () => 6 }];
 * objs.map(iv('c')); // => [3, 6]
 * [' a', ' b', ' c'].map(iv('trim')); // => ['a', 'b', 'c']
 * iv<typeof obj, 'c'>('c')(obj); // => 3
 * ```
 */
const iv =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TODO: Fix this


    <const T, const P extends MethodKey<T>>(name: P) =>
    // @ts-expect-error - TS doesn't know T[P] is a function
    (x: T): ReturnType<T[P]> =>
      (x[name as unknown as keyof T] as (...args: unknown[]) => unknown)() as never;

export default iv;
