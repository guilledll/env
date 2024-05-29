import { _internal } from './src/utils.ts';

/**
 * Load `.env` file variables into the application.
 *
 * @param [envPath='.env'] - Relative path to the environment file
 */
export async function initEnv(envPath: string = '.env'): Promise<void> {
  const envObject = await _internal.loadEnvFile(envPath);

  Object.entries(envObject).forEach(([name, value]) => setEnv(name, value));
}

/**
 * Set an environment variable, existing variables will be overwritten.
 *
 * @param name - Name of the variable
 * @param value - Value to save on the variable
 */
export function setEnv(name: string, value: string): void {
  Deno.env.set(name, value);
}

/**
 * Get the given environment variable.
 *
 * @example
 * ```ts
 * import { getEnv } from "jsr:@guille/env";
 *
 * getEnv('DB_HOST'); // '127.0.0.1'
 * ```
 *
 * @param name - Name of the variable
 */
export function getEnv(name: string): string | undefined;
/**
 * Get multiple environment variables.
 *
 * @example
 * ```ts
 * import { getEnv } from "jsr:@guille/env";
 *
 * getEnv('DB_HOST', 'DB_PORT'); // ['127.0.0.1', '5432']
 * ```
 *
 * @param names - Names of the variables
 */
export function getEnv(...names: string[]): (string | undefined)[];
export function getEnv(...names: string[]): string | undefined | (string | undefined)[] {
  const get = (v: string) => Deno.env.get(v);

  if (names.length === 1) {
    return get(names[0]);
  }

  return names.map((v) => get(v));
}

/**
 * Check if the given variable exists.
 *
 * @example
 * ```ts
 * import { hasEnv } from "jsr:@guille/env";
 *
 * hasEnv('DB_HOST'); // true
 * hasEnv('NON_EXIST'); // false
 * ```
 *
 * @param name - Name of the variable
 */
export function hasEnv(name: string): boolean;
/**
 * Check if multiple variables exists.
 *
 * @example
 * ```ts
 * import { hasEnv } from "jsr:@guille/env";
 *
 * hasEnv('DB_HOST', 'NON_EXIST'); // [true, false]
 * ```
 *
 * @param names - Names of the variables
 */
export function hasEnv(...names: string[]): boolean[];
export function hasEnv(...names: string[]): boolean | boolean[] {
  const has = (v: string) => Deno.env.has(v);

  if (names.length === 1) {
    return has(names[0]);
  }

  return names.map((v) => has(v));
}

/**
 * Check if all variables exists on the environment.
 *
 * @example
 * ```ts
 * import { hasEnvAll } from "jsr:@guille/env";
 *
 * hasEnvAll('DB_HOST', 'MAIL_USER'); // true
 * hasEnvAll('DB_HOST', 'NON_EXIST'); // false
 * ```
 *
 * @param names - Variable names to check
 */
export function hasEnvAll(...names: string[]): boolean {
  return names.every((v) => hasEnv(v));
}

/**
 * Remove a variable from the environment.
 *
 * @example
 * ```ts
 * import { delEnv, getEnv } from "jsr:@guille/env";
 *
 * delEnv('DB_HOST');
 * getEnv('DB_HOST'); // undefined
 * ```
 *
 * @param name - Name of the variable
 */
export function delEnv(name: string): void;
/**
 * Remove multiple variables from the environment.
 *
 * @example
 * ```ts
 * import { delEnv, getEnv } from "jsr:@guille/env";
 *
 * delEnv('DB_HOST', 'DB_PORT');
 * getEnv('DB_HOST', 'DB_PORT'); // [undefined, undefined]
 * ```
 *
 * @param names - Names of the variables
 */
export function delEnv(...names: string[]): void;
export function delEnv(...names: string[]): void {
  const del = (v: string) => Deno.env.delete(v);

  if (names.length === 1) {
    return del(names[0]);
  }

  return names.forEach((v) => del(v));
}
