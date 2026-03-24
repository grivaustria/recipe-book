import { useScrollReveal } from "@hooks/useScrollReveal";
import type { ReactNode } from "react";

import styles from "./features.module.scss";

type IFeaturesData = {
  id: string;
  icon: string | ReactNode;
  title: string;
  desc: string;
  order: number;
};

const revealDelayClasses = [
  "",
  styles["reveal-delay-1"],
  styles["reveal-delay-2"],
  styles["reveal-delay-3"],
];

const LPFeatures = () => {
  const featuresRef = useScrollReveal<HTMLElement>({
    selector: `.${styles.reveal}`,
    visibleClass: styles.visible,
  });

  const featuresData: IFeaturesData[] = [
    {
      id: "organize",
      icon: "\u{1F4C1}",
      title: "Organized by Category",
      desc: "Sort your dishes into Fish, Meat, Veggies, or Dessert. Find what you're craving in seconds and never scroll endlessly again.",
      order: 0,
    },
    {
      id: "instant-search",
      icon: "\u{1F50D}",
      title: "Instant Search",
      desc: "Type a dish name and find it instantly. Your entire recipe collection stays searchable from anywhere on any device.",
      order: 1,
    },
    {
      id: "any-device",
      icon: "\u{1F4F1}",
      title: "Any Device, Any Time",
      desc: "Log in from your phone in the kitchen, your tablet at the table, or your laptop while meal planning. Your recipes follow you.",
      order: 2,
    },
    {
      id: "gallery",
      icon: "\u{1F5BC}\uFE0F",
      title: "Beautiful Gallery View",
      desc: "See your recipes as a stunning visual gallery with dish photos front and center, because food should look as good as it tastes.",
      order: 0,
    },
    {
      id: "collection",
      icon: "\u2795",
      title: "Add Your Own Dishes",
      desc: "Save family recipes, secret techniques, or dishes you've mastered. Your personal collection keeps growing with you.",
      order: 1,
    },
    {
      id: "security",
      icon: "\u{1F512}",
      title: "Private & Secure",
      desc: "Your recipes are yours. Secure login keeps your personal collection private and accessible only to you.",
      order: 2,
    },
  ];

  return (
    <section className={styles.features} id="features" ref={featuresRef}>
      <div className={styles.reveal}>
        <span className={styles["section-label"]}>Why Dish Galeria</span>
        <h2 className={styles["section-title"]}>
          Built for home cooks who love good food.
        </h2>
      </div>
      <div className={styles["features-grid"]}>
        {featuresData.map((feat) => (
          <div
            key={feat.id}
            className={[
              styles["feature-card"],
              styles.reveal,
              revealDelayClasses[feat.order],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles["feature-icon"]}>{feat.icon}</div>
            <div className={styles["feature-title"]}>{feat.title}</div>
            <p className={styles["feature-desc"]}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LPFeatures;
