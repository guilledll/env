## Environment variables manager for Deno

[![JSR Version](https://jsr.io/badges/@guilledll/env)](https://jsr.io/@guilledll/env)
[![JSR Score](https://jsr.io/badges/@guilledll/env/score)](https://jsr.io/@guilledll/env/score)

Complete set of utils manage environment variables in [Deno](https://deno.com/) applications.

## Features

- **Set, Get, Check and Delete:** Simple functions to handle all your variables.
- **Intuitive and fully documented API:** Handle single or multiple variables with ease.
- **Custom environment filename:** Supports loading .env file with custom naming. 
- **Auto loading variables:** If preferred, use one line to load your .env file.
- **Fully tested:** 100% code and branch coverage using Deno test utils.

## Installation

```bash
deno add @guilledll/env
```

## Usage

**Auto load** the .env file or **manually load** with custom filename:

```js
import '@guilledll/env/load';

// === OR ===

import { initEnv } from '@guilledll/env';

await initEnv('.env.local');
```

Get **single** or **multiple variables** at once:

```js
import { getEnv } from '@guilledll/env';

const host = getEnv('DB_HOST'); // '127.0.0.1'
const [host, port] = getEnv('DB_HOST', 'DB_HOST'); // ['127.0.0.1', '5432']
```

Check existence of **single** or **multiple variables**:

```js
import { hasEnv } from '@guilledll/env';

if (hasEnv('FEATURE_ENABLED')) {
    // Do things....
}

const [driver, port] = hasEnv('MAIL_DRIVER', 'WRONG'); // [true, false]
```

Check if **all variables exists**, useful to validate feature access:

```js
import { hasEnvAll } from '@guilledll/env';

if (hasEnvAll('MAIL_DRIVER', 'MAIL_PORT', 'MAIL_USER')) {
    // Proceed to send emails....
}
```

Manually **set variables** at runtime:

```js
import { setEnv } from '@guilledll/env';

setEnv('QUEUE_AMOUNT', '35');
const queueAmount = getEnv('QUEUE_AMOUNT'); // '35'
```

Delete **single** or **multiple variables** from environment:

```js
import { delEnv } from '@guilledll/env';

delEnv('DB_HOST');
const host = getEnv('DB_HOST'); // undefined
```

## Issues

Any question of issue found? Please rise it on the [Issues](https://github.com/guilledll/env/issues) page.

## Contributing

Thanks for considering contributing to this project! Please make a [Pull Request](https://github.com/guilledll/env/pulls) to see your contribution added!

## License

This project is licensed under the [MIT license](LICENSE).
