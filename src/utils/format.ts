/**
 * Convert from snake_case to camelCase
 * @param str string
 */
export function toCamelCase(str: string): string {
  return str.trim().replace(/_\w/g, s => s[1].toUpperCase());
}
