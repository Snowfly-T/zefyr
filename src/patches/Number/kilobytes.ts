import { patch } from '../../.internal/utils/patch';
import kilobytes from '../../Number/kilobytes';

declare global {
  interface Number {
    /**
     * The corresponding size represented in kilobytes.
     *
     * @example
     * ```typescript
     * (2).kilobytes; // => 2048
     * ```
     */
    readonly kilobytes: number;
  }
}

patch(Number).withGetter({ kilobytes });
