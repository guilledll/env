import { assertEquals, assertExists, assertInstanceOf } from '@std/assert';
import { assertSpyCall, assertSpyCalls, spy } from '@std/testing/mock';
import { delEnv, getEnv, hasEnv, hasEnvAll, initEnv, setEnv } from '../mod.ts';
import { _internal } from '../src/utils.ts';

Deno.test('initEnv()', async (t) => {
  await t.step('loadEnvFile() is called and Deno.env is set', async () => {
    const loadEnvFileSpy = spy(_internal, 'loadEnvFile');
    const denoSpy = spy(Deno.env, 'set');

    await initEnv('.env');

    loadEnvFileSpy.restore();
    denoSpy.restore();

    assertSpyCalls(loadEnvFileSpy, 1);
    assertSpyCalls(denoSpy, 16);
  });

  await t.step('empty object is returned if .env not found', async () => {
    const loadEnvFileSpy = spy(_internal, 'loadEnvFile');
    const denoSpy = spy(Deno.env, 'set');

    await initEnv('tests/.env_empty');

    denoSpy.restore();
    loadEnvFileSpy.restore();

    assertSpyCalls(denoSpy, 0);
    assertSpyCall(loadEnvFileSpy, 0, { returned: Promise.resolve({}) });
  });

  await t.step('vars with quotes are loaded correctly', async () => {
    const envValueUsesQuotesSpy = spy(_internal, 'envValueUsesQuotes');

    await initEnv('.env');
    envValueUsesQuotesSpy.restore();

    assertSpyCall(envValueUsesQuotesSpy, 0, { returned: true });
    assertSpyCall(envValueUsesQuotesSpy, 4, { returned: false });
    assertSpyCall(envValueUsesQuotesSpy, 9, { returned: true });
    assertEquals(getEnv('SECRET_KEY'), '987bsdlkfjanlkjsdflkajsdflkjasdf');
    assertEquals(getEnv('MAIL_HOST'), 'smtp.mailtrap.io');
    assertEquals(getEnv('API_URL'), 'https://api.fakedomain.com');
  });
});

Deno.test('setEnv()', async (t) => {
  await t.step('is possible to set a variable', () => {
    setEnv('SIMPLY_UY', 'Soy Simply UY en Youtube');
    assertEquals(getEnv('SIMPLY_UY'), 'Soy Simply UY en Youtube');
  });

  await t.step('setting over an existing variable changes the value', () => {
    setEnv('SIMPLY_UY', 'Soy Simply UY en Youtube');
    assertEquals(getEnv('SIMPLY_UY'), 'Soy Simply UY en Youtube');
    setEnv('SIMPLY_UY', 'I am Simply UY on Youtube');
    assertEquals(getEnv('SIMPLY_UY'), 'I am Simply UY on Youtube');
  });
});

Deno.test('hasEnv()', async (t) => {
  await t.step('returns `true` if variable exists', () => {
    setEnv('SIMPLY_UY_2', 'Watch me on Youtube');
    assertEquals(hasEnv('SIMPLY_UY_2'), true);
  });

  await t.step('returns `false` if variable exists', () => {
    assertEquals(hasEnv('SIMPLY_UY_3'), false);
  });

  await t.step('returns array of booleans when param is an array', () => {
    setEnv('SIMPLY_UY_4', 'guille');
    setEnv('SIMPLY_UY_5', 'simply');

    const v = hasEnv('SIMPLY_UY_4', "SIMPLY_UY_5");

    assertInstanceOf(v, Array);
    assertEquals(v[0], true);
    assertEquals(v[1], true);
  })

  await t.step('returns false in the array of values when var not found', () => {
    setEnv('SIMPLY_UY_6', 'simply');

    const v = hasEnv("SIMPLY_UY_6", 'SIMPLY_UY_NON_EXIST');

    assertInstanceOf(v, Array);
    assertEquals(v[0], true);
    assertEquals(v[1], false);
  })
});

Deno.test('hasEnvAll()', async (t) => {
  await t.step('returns `true` when all variables exists', () => {
    setEnv('SIMPLY_UY_All_1', 'Watch me on Youtube');
    setEnv('SIMPLY_UY_All_2', 'Watch me on Youtube 2.0');

    const v = hasEnvAll('SIMPLY_UY_All_1', 'SIMPLY_UY_All_2');

    assertEquals(v, true);
  });

  await t.step('returns `false` when at least one variable not exists', () => {
    setEnv('SIMPLY_UY_All_3', 'Maybe Watch me on Youtube');

    const v = hasEnvAll('SIMPLY_UY_All_3', 'SIMPLY_UY_All_NON_EXIST');

    assertEquals(v, false);
  });
})

Deno.test('getEnv()', async (t) => {
  await t.step('returns correct value when it exists', () => {
    setEnv('TEST_GET_1', 'guille');

    const v = getEnv('TEST_GET_1');
    assertEquals(v, 'guille');
  });

  await t.step('returns `undefined` when value is not found', () => {
    const v = getEnv('pepe');
    assertEquals(v, undefined);
  });

  await t.step('returns array of values when param is an array', () => {
    setEnv('TEST_GET_3', 'guille');
    setEnv('TEST_GET_4', 'simply');

    const v = getEnv('TEST_GET_3', "TEST_GET_4");

    assertInstanceOf(v, Array);
    assertEquals(v[0], 'guille');
    assertEquals(v[1], 'simply');
  })

  await t.step('returns undefined in the array of values when var not found', () => {
    setEnv('TEST_GET_5', 'trufa');

    const v = getEnv("TEST_GET_X", 'TEST_GET_5');

    assertInstanceOf(v, Array);
    assertEquals(v[0], undefined);
    assertEquals(v[1], 'trufa');
  })
});

Deno.test('delEnv()', async (t) => {
  await t.step('unset existing environment variable', () => {
    setEnv('TEST_DEL_1', 'trufa_2.0');

    assertExists(getEnv('TEST_DEL_1'));
    delEnv('TEST_DEL_1');
    assertExists(!getEnv('TEST_DEL_1'));
  });

  await t.step('deleting inexistent variable returns undefined', () => {
    assertExists(!getEnv('TEST_DEL_1'));
    delEnv('TEST_DEL_2');
    assertExists(!getEnv('TEST_DEL_2'));
  });

  await t.step('unset multiple variables', () => {
    setEnv('TEST_DEL_3', 'deno rules');
    setEnv('TEST_DEL_4', 'vue.js rule');

    delEnv('TEST_DEL_3', 'TEST_DEL_4');

    assertExists(!getEnv('TEST_DEL_3'));
    assertExists(!getEnv('TEST_DEL_4'));
  })
});
