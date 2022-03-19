import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { SearchIcon, UserIcon } from "../utils/icons";

/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Disabling this rule from the file because of how next's link works.
 */

export const Header = () => {
  return (
    <>
      <Link href={"#main"} passHref>
        <a className={styles.skiplink}>Siirry sisältöön</a>
      </Link>
      <header className={styles.header}>
        <Link href="/">Alman Akka</Link>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link href={"/"} passHref>
                <a className={styles.navitem}>
                  <SearchIcon />
                  <span className={styles["navitem-text"]}>Hae</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className={styles.navitem}>
                  <UserIcon />
                  <span className={styles["navitem-text"]}>Kirjaudu</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};