import { patch } from '../../.internal/utils/patch';
import isNumberPrimitive from '../../global/isNumberPrimitive';

declare global {
  /**
   * Returns `true` if the value is a number primitive.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isNumberPrimitive(0); // => true
   * isNumberPrimitive(1); // => true
   * isNumberPrimitive(1.5); // => true
   * isNumberPrimitive(''); // => false
   * ```
   */
  function isNumberPrimitive(value: unknown): value is number;
}

patch(globalThis).withStatic({ isNumberPrimitive });
