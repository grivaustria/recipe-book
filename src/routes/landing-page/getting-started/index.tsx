import { useScrollReveal } from "@hooks/useScrollReveal";

import styles from "./getting-started.module.scss";

type IGettingStartedData = {
  id: string;
  step: string;
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

const LPGettingStarted = () => {
  const gettingStartedRef = useScrollReveal<HTMLElement>({
    selector: `.${styles.reveal}`,
    visibleClass: styles.visible,
  });

  const gettingStartedData: IGettingStartedData[] = [
    {
      id: "create-account",
      step: "01",
      title: "Create your account",
      desc: "Sign up in seconds with just your email. No credit card, no catch. Your galeria is ready immediately.",
      order: 0,
    },
    {
      id: "add-first-dish",
      step: "02",
      title: "Add your first dish",
      desc: 'Click "Add New Dish", upload a photo, pick a category, and give it a name. As easy as it sounds.',
      order: 1,
    },
    {
      id: "cook-and-explore",
      step: "03",
      title: "Cook & explore",
      desc: "Browse your gallery, search by name, filter by category, and discover your next meal with ease.",
      order: 2,
    },
  ];

  return (
    <section className={styles.how} id="how" ref={gettingStartedRef}>
      <div className={styles["how-inner"]}>
        <div className={styles.reveal}>
          <span className={styles["section-label"]}>Getting Started</span>
          <h2 className={styles["section-title"]}>
            Three steps to your dream recipe collection.
          </h2>
        </div>
        <div className={styles.steps}>
          {gettingStartedData.map((step) => (
            <div
              key={step.id}
              className={[
                styles.step,
                styles.reveal,
                revealDelayClasses[step.order],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles["step-num"]}>{step.step}</div>
              <div className={styles["step-title"]}>{step.title}</div>
              <p className={styles["step-desc"]}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LPGettingStarted;
