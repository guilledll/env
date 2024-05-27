/**
 * This module contains functions to interact with environment variables.
 * 
 * @module env
 */

import { _internal } from './src/utils.ts';

/**
 * Load `.env` file variables into the application.
 */
export async function initEnv(envPath: string = '.env') {
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
 * import { getEnv } from "@guidev/env";
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
 * import { getEnv } from "@guidev/env";
 * 
 * getEnv('DB_HOST', 'DB_HOST'); // ['127.0.0.1', '5432']
 * ```
 *
 * @param names - Names of the variables
 */
export function getEnv(...args: string[]): (string | undefined)[];
export function getEnv(...args: string[]): string | undefined | (string | undefined)[] {
  const get = (v: string) => Deno.env.get(v);

  if (args.length === 1) {
    return get(args[0])
  }

  return args.map((v) => get(v));
}

/**
 * Check if the given variable exists.
 * 
 * @example
 * ```ts
 * import { hasEnv } from "@guidev/env";
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
 * import { hasEnv } from "@guidev/env";
 * 
 * hasEnv('DB_HOST', 'NON_EXIST'); // [true, false]
 * ```
 *
 * @param names - Names of the variables
 */
export function hasEnv(...args: string[]): boolean[];
export function hasEnv(...args: string[]): boolean | boolean[] {
  const has = (v: string) => Deno.env.has(v);

  if (args.length === 1) {
    return has(args[0]);
  }

  return args.map(v => has(v))
}

/**
 * Check if all variables exists on the environment.
 * 
 * @example
 * ```ts
 * import { hasEnvAll } from "@guidev/env";
 * 
 * hasEnvAll('DB_HOST', 'MAIL_USER'); // true
 * hasEnvAll('DB_HOST', 'NON_EXIST'); // false
 * ```
 * 
 * @param names - Variable names to check
 */
export function hasEnvAll(...names: string[]): boolean {
  return names.every(v => hasEnv(v));
}

/**
 * Remove a variable from the environment.
 * 
 * @example
 * ```ts
 * import { delEnv } from "@guidev/env";
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
 * import { delEnv } from "@guidev/env";
 * 
 * delEnv('DB_HOST', 'DB_PORT');
 * getEnv('DB_HOST', 'DB_PORT'); // [undefined, undefined]
 * ```
 *
 * @param name - Names of the variables
 */
export function delEnv(...names: string[]): void
export function delEnv(...names: string[]): void {
  const del = (v: string) => Deno.env.delete(v);

  if (names.length === 1) {
    return del(names[0]);
  }

  return names.forEach(v => del(v));
}