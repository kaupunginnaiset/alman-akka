import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/Layout.module.css";
import { SearchIcon, UserIcon } from "../utils/icons";

/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Disabling this rule from the file because of how next's link works.
 */

export const Header = () => {
  const router = useRouter();
  const isSignedIn = router.pathname.startsWith("/my-events");
  const isLoginPage = router.pathname.startsWith("/login");
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
            {!isLoginPage && (
              <li>
                <Link href={isSignedIn ? "/logout" : "/login"} passHref>
                  <a className={styles.navitem}>
                    {/* TODO: logout icon */}
                    <UserIcon />
                    <span className={styles["navitem-text"]}>{isSignedIn ? "Ulos" : "Omat"}</span>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
