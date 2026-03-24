import { Link } from "react-router-dom";

import styles from "./nav.module.scss";

type INavigationData = {
  id: string;
  link: string;
  field: string;
  isCta: boolean;
};
const LPNavigation = () => {
  const navigationData: INavigationData[] = [
    { id: "link-feature", link: "#features", field: "Features", isCta: false },
    { id: "link-how", link: "#how", field: "How it Works", isCta: false },
    {
      id: "link-categories",
      link: "#categories",
      field: "How it Works",
      isCta: false,
    },
    { id: "link-signup", link: "#signup", field: "Start Free", isCta: true },
  ];
  return (
    <nav className={styles.nav}>
      <div className={styles["nav-logo"]}>
        Dish <span>Galeria</span>
      </div>
      <div className={styles["nav-links"]}>
        {navigationData.map((nav) =>
          nav.isCta ? (
            <Link key={nav.id} to="/signup" className={styles["nav-cta"]}>
              {nav.field}
            </Link>
          ) : (
            <a key={nav.id} href={nav.link}>
              {nav.field}
            </a>
          ),
        )}
      </div>
    </nav>
  );
};

export default LPNavigation;
