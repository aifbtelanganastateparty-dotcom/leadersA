/**
 * Simple HTML sanitizer and template tag to prevent XSS.
 * Can be used as: html`<div>${unsafeInput}</div>`
 */
export function html(
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | { __html: string } | null | undefined)[]
): string {
  return strings.reduce((acc, str, i) => {
    const value = values[i] !== undefined ? values[i] : '';

    let escaped: string;

    // If it's a "raw" object, don't escape it
    if (value && typeof value === 'object' && value.__html) {
      escaped = String(value.__html);
    } else {
      escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    return acc + str + escaped;
  }, '');
}

/**
 * Marks a string as "safe" to prevent escaping by the html tag.
 */
export function raw(val: string): { __html: string } {
  return { __html: val };
}
