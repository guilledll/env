/**
 * Automatically load environment variables into the application.
 * By default this module supports loading an `.env` file, if
 * a different behavior is needed please use the `initEnv()`
 * function from `@guille/env` with the custom file name.
 *
 * @module load
 */

import { initEnv } from './mod.ts';

await initEnv();
