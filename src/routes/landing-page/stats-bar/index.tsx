import { useScrollReveal } from "@hooks/useScrollReveal";

import styles from "./stats-bar.module.scss";

type IStatsData = IStaticDataField & {
  order: number;
};

const revealDelayClasses = [
  "",
  styles["reveal-delay-1"],
  styles["reveal-delay-2"],
  styles["reveal-delay-3"],
];

const StatsBar = () => {
  const statsBarRef = useScrollReveal<HTMLDivElement>({
    selector: `.${styles.reveal}`,
    visibleClass: styles.visible,
  });

  const statsData: IStatsData[] = [
    { id: "stats-data-1", field: "4", value: "Categories", order: 0 },
    { id: "stats-data-2", field: "Any", value: "Device, anytime", order: 1 },
    { id: "stats-data-3", field: "Free", value: "To get started", order: 2 },
  ];

  return (
    <div className={styles["stats-bar"]} ref={statsBarRef}>
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className={[
            styles.stat,
            styles.reveal,
            revealDelayClasses[stat.order],
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles["stat-num"]}>{stat.field}</span>
          <span className={styles["stat-label"]}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
