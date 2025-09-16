import { NYTDoc, NewsItem } from "@/types/common";

export function normalizeDoc(doc: NYTDoc): NewsItem {
  return {
    title: doc.headline.main,
    url: doc.web_url,
    multimedia: doc.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${doc.multimedia[0].url.replace(/^\/+/, "")}`
      : "https://developer.nytimes.com/files/poweredby_nytimes_200c.png?v=1583354208354",
    pub_date: doc.pub_date,
    source: doc.source,
  };
}

export function groupByDay(items: NewsItem[]) {
  return items.reduce<Record<string, NewsItem[]>>((acc, it) => {
    const key = new Date(it.pub_date).toISOString().slice(0, 10);
    (acc[key] ||= []).push(it);
    return acc;
  }, {});
}

export function sortDescByPubDate(items: NewsItem[]): NewsItem[] {
  return [...items].sort(
    (a, b) => +new Date(b.pub_date) - +new Date(a.pub_date)
  );
}

export function safeCut<T>(arr: T[], limit = 300): T[] {
  return arr.slice(0, limit);
}

// ru-RU приходится ставить для форматирования, как в макете - с точками, а не слэшами
export function formatDayHeader(iso: string, locale: string = "ru-RU") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatCardDateTime(
  iso: string,
  {
    locale = "ru-RU",
    timeZone,
    hour12 = false,
  }: { locale?: string; timeZone?: string; hour12?: boolean } = {}
) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12,
    timeZone: "UTC",
    ...(timeZone ? { timeZone } : {}),
  }).format(new Date(iso));
}
