import type { ListOf } from '../internal/types/union';

export type Mean<AS extends readonly unknown[]> = AS extends [] | readonly []
  ? 0
  : HasOnlyNumberOrBigInt<ListOf<AS[number]>> extends true
  ? AS[number] extends number | bigint
    ? GeneralizeNumeric<AS[number]>
    : never
  : never;

type HasOnlyNumberOrBigInt<AS extends readonly unknown[]> = [
  HasOnlyNumberAndHaltAtNonNumeric<AS>,
  HasOnlyBigIntAndHaltAtNonNumeric<AS>,
] extends [true, false]
  ? true
  : [HasOnlyNumberAndHaltAtNonNumeric<AS>, HasOnlyBigIntAndHaltAtNonNumeric<AS>] extends [
      false,
      true,
    ]
  ? true
  : false;
type HasOnlyNumberAndHaltAtNonNumeric<AS extends readonly unknown[]> = AS extends readonly [
  infer THead,
  ...infer TTail,
]
  ? TTail extends []
    ? THead extends number
      ? true
      : false
    : THead extends number
    ? HasOnlyNumberAndHaltAtNonNumeric<TTail> extends true
      ? true
      : false
    : false
  : never;
type HasOnlyBigIntAndHaltAtNonNumeric<AS extends readonly unknown[]> = AS extends readonly [
  infer THead,
  ...infer TTail,
]
  ? TTail extends []
    ? THead extends bigint
      ? true
      : false
    : THead extends bigint
    ? HasOnlyBigIntAndHaltAtNonNumeric<TTail> extends true
      ? true
      : false
    : false
  : never;

type GeneralizeNumeric<N extends number | bigint> = number extends N
  ? N
  : bigint extends N
  ? N
  : N extends number
  ? number
  : bigint;

/**
 * Returns the mean of all elements in the array (only for number or bigint arrays).
 *
 * **Do not** use it with an array of bigint with zero elements, as it will return `0` instead of `0n`.
 * @param array The array to get the mean of.
 *
 * @throws {TypeError} If the array contains non-numbers or mixed numbers and bigints.
 *
 * @example
 * ```typescript
 * const arr = [2, 1, 3.5, 3, 4];
 * mean(array); // => 2.7
 * ```
 */
const mean = <T>(array: T[] | readonly T[]): Mean<typeof array> => {
  type R = Mean<typeof array>;
  if (array.length === 0) return 0 as R;
  const type = typeof array[0];
  if (type !== 'number' && type !== 'bigint')
    throw new TypeError('Cannot get the mean of an array of non-numbers');
  const sum = array.reduce((acc, cur) => {
    if (typeof cur !== 'number' && typeof cur !== 'bigint')
      throw new TypeError('Cannot get the mean of an array of non-numbers');
    if (typeof cur !== type)
      throw new TypeError('Cannot get the mean of an array of mixed numbers and bigints');
    return ((acc as number) + (cur as number)) as T;
  }, (type === 'bigint' ? 0n : 0) as T) as R;
  return (sum / ((typeof sum === 'bigint' ? BigInt(array.length) : array.length) as R)) as R;
};

export default mean;
