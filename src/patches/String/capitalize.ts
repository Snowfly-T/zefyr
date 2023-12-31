import capitalize from '../../String/capitalize';
import { patch } from '../../internal/utils/patch';

declare global {
  interface String {
    /**
     * Converts the first character of a string to uppercase.
     *
     * @example
     * ```typescript
     * 'hello'.capitalize(); // => 'Hello'
     * ```
     */
    capitalize<const S extends string>(this: S): Capitalize<S>;
  }
}

patch(String).with({ capitalize });
