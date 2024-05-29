type ParsedEnv = Record<string, string>;

/**
 * Check if the variable is declared with single `''` or double `""` quotes.
 *
 * @param value - Environment variable to check
 * @returns If the value has quotes
 */
function envValueUsesQuotes(value: string): boolean {
  const singleQuotes = (v: string) => v.startsWith("'") && v.endsWith("'");
  const doubleQuotes = (v: string) => v.startsWith('"') && v.endsWith('"');

  return singleQuotes(value) || doubleQuotes(value);
}

/**
 * Check and parse every line of the `.env` file content.
 *
 * @param envContent - Content returned from the `.env` file
 * @returns Object like parsed variables and value
 */
function parseEnvContent(envContent: string): ParsedEnv {
  const envObject: ParsedEnv = {};

  if (!envContent || !envContent.length) {
    return envObject;
  }

  for (let line of envContent.split('\n')) {
    line = line.trim();

    // Skip empty lines or comments
    if (!line || line.startsWith('#')) {
      continue;
    }

    // Split names and values bt splitting in `=`
    let [key, value] = line.split('=');

    // Check and remove quotes ('', "") on the value
    if (_internal.envValueUsesQuotes(value)) {
      value = value.slice(1, -1);
    }

    envObject[key.trim()] = value.trim();
  }

  return envObject;
}

/**
 * Load the environment file.
 *
 * @param envPath - Path of the `.env` file
 * @returns Parsed content from `.env` file
 */
export async function loadEnvFile(envPath: string = '.env'): Promise<ParsedEnv> {
  const envFile = await Deno.readTextFile(envPath);
  return _internal.parseEnvContent(envFile);
}

/**
 * Exposed for testing purposes.
 *
 * @internal
 */
export const _internal = { loadEnvFile, parseEnvContent, envValueUsesQuotes };
