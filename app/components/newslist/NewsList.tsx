"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import NewsDay from "../newsday/NewsDay";
import { useNewsFeed } from "@/lib/features/useNewsFeed";
import styles from "./NewsList.module.css";
import loading from "../../../public/loading.svg";

// сколько показываем сначала и какая "порция" догружается
const INITIAL_LIMIT = 20;
const CHUNK = 20;

// показала имитацию небольшой задержки подгрузки, чтобы спиннер успевал показаться
const MIN_APPEND_LATENCY_MS = 400;

const NewsList = () => {
  const [isVisible, setIsVisible] = useState(INITIAL_LIMIT);
  const [isAppending, setIsAppending] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { grouped, isLoading, error, hasMore, totalAvailable } =
    useNewsFeed(isVisible);

  const orderedDates = useMemo(
    () => Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1)),
    [grouped]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;
    const node = sentinelRef.current;

    const intObserver = new IntersectionObserver(
      (entries) => {
        const element = entries[0];
        if (!element.isIntersecting) return;
        if (!hasMore || isAppending) return;

        setIsAppending(true);
        const t = setTimeout(() => {
          setIsVisible((v) => Math.min(v + CHUNK, totalAvailable));
          setIsAppending(false);
        }, MIN_APPEND_LATENCY_MS);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    intObserver.observe(node);
    return () => intObserver.disconnect();
  }, [hasMore, isAppending, totalAvailable]);

  if (isLoading)
    return (
      <Image src={loading} alt="Loading..." className={styles.loadingDots} />
    );

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className={styles.newsList}>
      {orderedDates.map((date) => (
        <NewsDay key={date} cards={grouped[date]} date={date} />
      ))}

      {hasMore && (
        <div className={styles.appendSpinner}>
          {isAppending && (
            <Image
              src={loading}
              alt="Loading..."
              className={styles.loadingDots}
            />
          )}
        </div>
      )}

      <div ref={sentinelRef} aria-hidden />
    </div>
  );
};

export default NewsList;
