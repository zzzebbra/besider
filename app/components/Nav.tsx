"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../styles/layout.module.css";
import menuIcon from "/public/hamburger_menu.svg";
import closeIcon from "/public/close.svg";

export const Nav = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div
        className={`${styles.topContainer} ${!isMenuOpen ? "" : styles.hidden}`}
      >
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <Image src={menuIcon} alt="menu icon" className={styles.menuIcon} />
        </button>
        <Link
          className={`${styles.navlink} ${styles.siteTitle} ${
            pathname === "/" ? styles.active : ""
          }`}
          href="/"
        >
          <h1 className={styles.siteTitle}>Besider</h1>
        </Link>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? "" : styles.hidden}`}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close menu"
          onClick={toggleMenu}
        >
          <Image
            src={closeIcon}
            alt="close icon"
            className={styles.closeIcon}
          />
        </button>
        <Link
          className={`${styles.navlink} ${
            pathname === "/science" ? styles.active : ""
          }`}
          href="/science"
        >
          SCIENCE
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/general" ? styles.active : ""
          }`}
          href="/general"
        >
          GENERAL
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/entertainment" ? styles.active : ""
          }`}
          href="/entertainment"
        >
          ENTERTAINMENT
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/technology" ? styles.active : ""
          }`}
          href="/technology"
        >
          TECHNOLOGY
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/business" ? styles.active : ""
          }`}
          href="/business"
        >
          BUSINESS
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/health" ? styles.active : ""
          }`}
          href="/health"
        >
          HEALTH
        </Link>
        <Link
          className={`${styles.navlink} ${
            pathname === "/sports" ? styles.active : ""
          }`}
          href="/sports"
        >
          SPORTS
        </Link>
      </nav>
    </>
  );
};
