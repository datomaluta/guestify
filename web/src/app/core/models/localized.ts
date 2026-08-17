import { AppLanguage } from './hotel.model';

/**
 * ბაზაში მრავალენოვანი ველები ინახება სვეტების სახით: `title_ka`, `title_en`, `title_ru`.
 * ეს helper ირჩევს მიმდინარე ენის მნიშვნელობას, თუ ცარიელია — უბრუნდება ქართულს.
 */
export function localize<T extends Record<string, any>>(
  item: T,
  field: string,
  lang: AppLanguage
): string {
  const value = item[`${field}_${lang}`] as string | null | undefined;
  const fallback = item[`${field}_ka`] as string | null | undefined;
  return value || fallback || '';
}
