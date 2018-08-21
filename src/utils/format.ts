/**
 * Return string in camelCase
 * @param str string
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Return string in snake_case
 * @param str string
 */
export function toSnakeCase(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}
