import { Header } from "./Header";
import styles from "../../styles/Layout.module.css";

interface LayoutProps {
  children: JSX.Element[];
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
