import isNotEmpty from '../../String/isNotEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  interface String {
    /**
     * Returns `true` if the string is not empty.
     *
     * @example
     * ```typescript
     * ''.isNotEmpty(); // => false
     * ' '.isNotEmpty(); // => true
     * ```
     *
     * @see {@link String#isEmpty}
     */
    isNotEmpty<const S extends string>(this: S): this is Exclude<S, ''>;
  }
}

patch(String).with({ isNotEmpty });
