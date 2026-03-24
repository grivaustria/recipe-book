import styles from "./landing-page.module.scss";

import LPNavigation from "./nav";
import HeroSection from "./hero";
import StatsBar from "./stats-bar";
import LPFeatures from "./features";
import LPGettingStarted from "./getting-started";
import LPCategories from "./categories";
import LPFooter from "./footer";

const LandingPage = () => (
  <div className={styles.page}>
    <LPNavigation />
    <HeroSection />
    <StatsBar />
    <LPFeatures />
    <LPGettingStarted />
    <LPCategories />
    <LPFooter />
  </div>
);

export default LandingPage;
