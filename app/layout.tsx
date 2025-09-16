"use client";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import StoreProvider from "./StoreProvider";
import { Nav } from "./components/Nav";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import newsLogo from "../public/news.svg";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <main
              className={`${styles.main} ${isMenuOpen ? styles.hidden : ""}`}
            >
              {children}
            </main>

            <footer className={styles.footer}>
              <nav className={styles.footer__nav}>
                <a
                  className={styles.link}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Log In
                </a>
                <a
                  className={styles.link}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
                <a
                  className={styles.link}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publishers
                </a>
                <a
                  className={styles.link}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitemap
                </a>
              </nav>
              <div className={styles.footer__creds}>
                <span className={styles.footer__text}>Powered by</span>
                <Image src={newsLogo} alt="News API logo" />
              </div>
              <span className={styles.footer__copyright}>
                © 2023 Besider. Inspired by Insider
              </span>
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
