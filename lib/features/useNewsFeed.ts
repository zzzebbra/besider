import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArchive } from "./nytApi";
import {
  normalizeDoc,
  groupByDay,
  sortDescByPubDate,
  safeCut,
} from "./nytUtils";
import { NewsItem } from "@/types/common";
import { useAppDispatch } from "@/lib/hooks";
import { addSeenIds } from "./newsSlice";

type Grouped = Record<string, NewsItem[]>;

export function useNewsFeed(limit = 20) {
  const dispatch = useAppDispatch();

  const { year, month } = useMemo(() => {
    const now = new Date();
    return {
      year: now.getUTCFullYear(),
      month: 5, //now.getUTCMonth() + 1, - должно быть так, но у NYT в Archive API нет месяцев после мая, поэтому хардкодим май
    };
  }, []);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["nyt-archive", year, month],
    queryFn: () => fetchArchive({ year, month }),
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });

  let grouped: Grouped = {};
  let totalAvailable = 0;
  if (data) {
    const cards = data.map(normalizeDoc);
    const sorted = sortDescByPubDate(cards);
    totalAvailable = sorted.length;
    const cut = safeCut(sorted, limit);
    grouped = groupByDay(cut);

    dispatch(addSeenIds(cut.map((c) => c.url)));
  }

  const hasMore = totalAvailable > limit;

  return { grouped, isLoading, isFetching, error, hasMore, totalAvailable };
}
