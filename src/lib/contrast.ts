export type ThemeTokens = Record<string, string>;

export type ContrastPair = {
  foreground: string;
  background: string;
  minimum: number;
};

export const CONTRAST_PAIRS: Record<string, ContrastPair> = {
  body: {
    foreground: "--color-text",
    background: "--color-background",
    minimum: 4.5
  },
  muted: {
    foreground: "--color-muted",
    background: "--color-background",
    minimum: 4.5
  },
  link: {
    foreground: "--color-accent",
    background: "--color-background",
    minimum: 4.5
  },
  button: {
    foreground: "--color-accent-contrast",
    background: "--color-accent",
    minimum: 4.5
  },
  surfaceText: {
    foreground: "--color-text",
    background: "--color-surface",
    minimum: 4.5
  },
  border: {
    foreground: "--color-border",
    background: "--color-background",
    minimum: 1.5
  },
  focus: {
    foreground: "--color-highlight",
    background: "--color-background",
    minimum: 3
  }
};

function normalizeHex(hex: string) {
  const value = hex.trim().replace(/^#/, "");

  if (/^[0-9a-f]{3}$/i.test(value)) {
    return value
      .split("")
      .map((character) => `${character}${character}`)
      .join("");
  }

  if (!/^[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`Unsupported color value: ${hex}`);
  }

  return value;
}

function hexToRgb(hex: string) {
  const value = normalizeHex(hex);
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255);
}

function linearize(channel: number) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const [red, green, blue] = hexToRgb(hex).map(linearize);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground: string, background: string) {
  const foregroundLuminosity = luminance(foreground);
  const backgroundLuminosity = luminance(background);
  const lighter = Math.max(foregroundLuminosity, backgroundLuminosity);
  const darker = Math.min(foregroundLuminosity, backgroundLuminosity);

  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

function parseDeclarations(block: string) {
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g)].map((match) => [
      match[1],
      match[2]
    ])
  );
}

export function parseThemeTokens(css: string) {
  const rootBlock = css.match(/:root\s*{(?<block>[\s\S]*?)}/)?.groups?.block ?? "";
  const darkBlock =
    css.match(
      /@media\s*\(prefers-color-scheme:\s*dark\)\s*{[\s\S]*?:root\s*{(?<block>[\s\S]*?)}\s*}/
    )?.groups?.block ?? "";
  const light = parseDeclarations(rootBlock);

  return {
    light,
    dark: {
      ...light,
      ...parseDeclarations(darkBlock)
    }
  };
}

function resolveColor(value: string, tokens?: ThemeTokens) {
  if (value.startsWith("#")) return value;

  const tokenValue = tokens?.[value];
  if (!tokenValue) {
    throw new Error(`Missing color token: ${value}`);
  }

  return tokenValue;
}

export function assertContrastPairs(
  pairs: Record<string, ContrastPair>,
  label: string,
  tokens?: ThemeTokens
) {
  const failures = Object.entries(pairs)
    .map(([name, pair]) => {
      const foreground = resolveColor(pair.foreground, tokens);
      const background = resolveColor(pair.background, tokens);
      const ratio = contrastRatio(foreground, background);

      return {
        name,
        ratio,
        minimum: pair.minimum
      };
    })
    .filter((result) => result.ratio < result.minimum);

  if (failures.length > 0) {
    throw new Error(
      failures
        .map(
          (failure) =>
            `${label} ${failure.name} contrast ${failure.ratio} is below ${failure.minimum}`
        )
        .join("; ")
    );
  }
}
