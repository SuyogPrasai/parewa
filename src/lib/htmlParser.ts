import * as cheerio from 'cheerio';

type TagStyleConfig = {
  [tagName: string]: {
    className?: string;
    styles?: Record<string, string>;
  };
};

/**
 * Parses and styles specific HTML tags based on a configuration.
 *
 * @param rawHTML - The raw HTML string.
 * @param tagStyles - A config object mapping tags to class/styles.
 * @returns The modified HTML string (body content only).
 */
export function parseHTML(rawHTML: string, tagStyles: TagStyleConfig): string {
  const $ = cheerio.load(rawHTML);

  for (const tag in tagStyles) {
    const { className, styles } = tagStyles[tag];

    $(tag).each((_, el) => {
      if (className) {
        $(el).attr('class', className); // sets className directly
      }

      if (styles) {
        const existingStyle = $(el).attr('style') || '';
        const newStyle = Object.entries(styles)
          .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
          .join('; ');
        const mergedStyle = [existingStyle.trim(), newStyle].filter(Boolean).join('; ');
        $(el).attr('style', mergedStyle);
      }
    });
  }

  return $('body').html() ?? '';
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export const stripHTML = (html: string): string =>
  html.replace(/<[^>]+>/g, '').trim();
