import { assertEquals } from '@std/assert';
import { getEnv } from '../mod.ts';

import '../load.ts'; // import the file as the user will do

Deno.test('import "jsr:@guille/env/load"', () => {
  const v = getEnv('SESSION_SECRET');

  assertEquals(v, 'oij234lkajsdflkajsdflkjasdflkajsdf');
});
