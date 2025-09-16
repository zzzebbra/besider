import React from "react";
import styles from "./NewsCard.module.css";
import { TNewsCard } from "@/types/nyt/types";

const NewsCard = ({ title, url, multimedia, pub_date, source }: TNewsCard) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <h2 className={styles.card__source}>{source}</h2>
      <div className={styles.card__infoContainer}>
        <img src={multimedia} alt={title} className={styles.card__image} />
        <p className={styles.card__text}>{title}</p>
      </div>
      <p className={styles.card__pubDate}>{pub_date}</p>
    </a>
  );
};

export default NewsCard;
