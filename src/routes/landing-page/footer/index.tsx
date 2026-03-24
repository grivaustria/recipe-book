import styles from "./footer.module.scss";

const LPFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-logo"]}>
        Dish <span>Galeria</span>
      </div>
      <div className={styles["footer-copy"]}>
        &copy; {currentYear} Dish Galeria. Collect recipes, all in one place.
      </div>
    </footer>
  );
};

export default LPFooter;
