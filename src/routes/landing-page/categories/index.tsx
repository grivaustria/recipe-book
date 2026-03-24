import { useScrollReveal } from "@hooks/useScrollReveal";
import type { ReactNode } from "react";

import styles from "./categories.module.scss";

type ICategoriesData = {
  id: string;
  icon: string | ReactNode;
  label: string;
};

const LPCategories = () => {
  const categoriesRef = useScrollReveal<HTMLElement>({
    selector: `.${styles.reveal}`,
    visibleClass: styles.visible,
  });

  const categoriesData: ICategoriesData[] = [
    { id: "fish-dishes", icon: "\u{1F41F}", label: "Fish Dishes" },
    { id: "meat-dishes", icon: "\u{1F356}", label: "Meat Dishes" },
    { id: "veggies", icon: "\u{1F966}", label: "Veggies" },
    { id: "desserts", icon: "\u{1F36E}", label: "Desserts" },
    { id: "all-recipes", icon: "\u2728", label: "All Recipes" },
  ];

  return (
    <section className={styles.categories} id="categories" ref={categoriesRef}>
      <div className={styles.reveal}>
        <span className={styles["section-label"]}>Browse By Category</span>
        <h2 className={styles["section-title"]}>What's on the menu tonight?</h2>
      </div>
      <div className={`${styles["pill-row"]} ${styles.reveal}`}>
        {categoriesData.map((category) => (
          <div key={category.id} className={styles.pill}>
            <span>{category.icon}</span> {category.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LPCategories;
