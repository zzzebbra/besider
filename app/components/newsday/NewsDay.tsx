import React from "react";
import { NewsItem } from "@/types/common";
import styles from "./NewsDay.module.css";
import NewsCard from "../newscard/NewsCard";
import { formatDayHeader, formatCardDateTime } from "@/lib/features/nytUtils";

type NewsDayProps = {
  cards: NewsItem[];
  date: string;
};

const NewsDay = ({ cards, date }: NewsDayProps) => {
  return (
    <div className={styles.newsDay}>
      <h2 className={styles.newsDay__date}>News for {formatDayHeader(date)}</h2>
      <div className={styles.newDays__news}>
        {cards.map((card, index) => {
          return (
            <NewsCard
              key={card.title + index}
              title={card.title}
              url={card.url}
              multimedia={card.multimedia}
              pub_date={formatCardDateTime(card.pub_date, {
                locale: "en-GB",
                hour12: false,
                timeZone: "UTC",
              })}
              source={card.source}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsDay;
