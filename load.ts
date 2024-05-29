/**
 * Automatically load environment variables into the application.
 * By default this module supports loading an `.env` file, if
 * a different behavior is needed please use the `initEnv()`
 * function from `jsr:@guille/env` with custom file name.
 *
 * @module
 */

import { initEnv } from './mod.ts';

await initEnv();
