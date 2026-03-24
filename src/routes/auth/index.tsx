import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import styles from "./auth.module.scss";

type AuthTab = "login" | "signup";

type AuthPageProps = {
  activeTab: AuthTab;
  heading: string;
  subheading: string;
  children: ReactNode;
  footer?: ReactNode;
  note?: ReactNode;
};

const AuthPage = ({
  activeTab,
  heading,
  subheading,
  children,
  footer,
  note,
}: AuthPageProps) => (
  <main className={styles.page}>
    <ToastContainer />
    <section className={styles.shell}>
      <div className={styles.brandPanel}>
        <Link className={styles.brand} to="/">
          Dish <span>Galeria</span>
        </Link>
        <h1 className={styles.heroTitle}>
          Keep every family favorite in one beautiful kitchen archive.
        </h1>
        <p className={styles.heroCopy}>
          Save recipes, search fast, and pick up cooking from any device. Your
          galeria stays with you from meal planning to plating.
        </p>
        <div className={styles.heroHighlights}>
          <div className={styles.highlight}>
            <span>{"\u{1F4C1}"}</span>
            Organized by category
          </div>
          <div className={styles.highlight}>
            <span>{"\u{1F50D}"}</span>
            Instant search
          </div>
          <div className={styles.highlight}>
            <span>{"\u{1F4F1}"}</span>
            Works on any device
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardAccent} />
        <div className={styles.cardBody}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Authentication tabs"
          >
            <Link
              className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
              role="tab"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className={`${styles.tab} ${activeTab === "signup" ? styles.active : ""}`}
              role="tab"
              to="/signup"
            >
              Create Account
            </Link>
          </div>

          <div className={styles.panel}>
            <div className={styles.heading}>{heading}</div>
            <div className={styles.subheading}>{subheading}</div>
            {children}
            {note ? <div className={styles.terms}>{note}</div> : null}
            {footer ? <div className={styles.switchCopy}>{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AuthPage;
