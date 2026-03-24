import { Link } from "react-router-dom";

import styles from "./hero-section.module.scss";

import PorkSinigang from "@assets/dish-pork-sinigang.jpg";
import FriedTilapia from "@assets/dish-fried-tilapia.jpg";
import GinataangKalabasa from "@assets/dish-ginataang kalabasa.jpg";
import ChickenTinola from "@assets/dish-chicken-tinola.jpg";

type IVisualData = {
  id: string;
  dish: string;
  type: string;
  image: string;
};

const HeroSection = () => {
  const visualData: IVisualData[] = [
    {
      id: "meat-pork-sinigang",
      dish: "Pork Sinigang",
      type: "Meat",
      image: PorkSinigang,
    },
    {
      id: "fish-fried-tilapia",
      dish: "Fried Tilapia",
      type: "Fish",
      image: FriedTilapia,
    },
    {
      id: "veggies-ginataang-kalabasa",
      dish: "Ginataang Kalabasa",
      type: "Veggies",
      image: GinataangKalabasa,
    },
    {
      id: "meat-chicken-tinola",
      dish: "Chicken Tinola",
      type: "Meat",
      image: ChickenTinola,
    },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles["hero-content"]}>
        <div className={styles["hero-badge"]}>
          {"\u{1F372}"} Your Personal Recipe Collection
        </div>
        <h1 className={styles["hero-title"]}>
          Every recipe,
          <br />
          <em>beautifully</em>
          <br />
          in one place.
        </h1>
        <p className={styles["hero-sub"]}>
          Dish Galeria is where food memories live. Save, organize, and access
          your favorite recipes from any device, anytime you&apos;re ready to
          cook.
        </p>
        <div className={styles["hero-actions"]}>
          <Link to="/signup" className={styles["btn-primary"]}>
            Start Free
          </Link>
          <a href="#how" className={styles["btn-ghost"]}>
            See how it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles["hero-visual"]}>
        <div className={styles["dish-grid"]}>
          {visualData.map((data) => (
            <div key={data.id} className={styles["dish-card"]}>
              <div className={styles["dish-img"]}>
                <img src={data.image} alt={data.dish} />
              </div>
              <div className={styles["dish-info"]}>
                <div className={styles["dish-name"]}>{data.dish}</div>
                <div className={styles["dish-tag"]}>{data.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
