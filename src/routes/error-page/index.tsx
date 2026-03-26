import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { DishDataType } from "@app-types/dish";
import {
  useGetAuthUserQuery,
  useGetRecipesQuery,
} from "@store/services/recipesApi";
import styles from "./error-page.module.scss";

const backgroundEmojis = [
  {
    emoji: "\u{1F35C}",
    style: { top: "8%", left: "5%", "--dur": "7s", "--delay": "0s" },
  },
  {
    emoji: "\u{1F958}",
    style: { top: "15%", right: "8%", "--dur": "8s", "--delay": "1s" },
  },
  {
    emoji: "\u{1F357}",
    style: { top: "55%", left: "3%", "--dur": "6.5s", "--delay": "2s" },
  },
  {
    emoji: "\u{1F41F}",
    style: { top: "75%", left: "12%", "--dur": "9s", "--delay": "0.5s" },
  },
  {
    emoji: "\u{1F966}",
    style: { top: "25%", right: "4%", "--dur": "7.5s", "--delay": "1.5s" },
  },
  {
    emoji: "\u{1F36E}",
    style: { top: "70%", right: "6%", "--dur": "8.5s", "--delay": "3s" },
  },
  {
    emoji: "\u{1F336}\uFE0F",
    style: { top: "88%", right: "18%", "--dur": "6s", "--delay": "2.5s" },
  },
  {
    emoji: "\u{1F9C4}",
    style: { top: "42%", right: "2%", "--dur": "10s", "--delay": "0.8s" },
  },
] as const;

const dishTypeEmoji: Record<string, string> = {
  meat: "\u{1F356}",
  fish: "\u{1F41F}",
  veggies: "\u{1F966}",
  dessert: "\u{1F36E}",
};

const toSlug = (dishName: string) =>
  dishName.toLowerCase().replace(/\s+/g, "-");

const pickRandomDishByType = (recipes: DishDataType[]) => {
  const groupedByType = recipes.reduce<Record<string, DishDataType[]>>(
    (accumulator, recipe) => {
      const key = recipe.dishType.toLowerCase();
      accumulator[key] = [...(accumulator[key] ?? []), recipe];
      return accumulator;
    },
    {},
  );

  return Object.entries(groupedByType)
    .map(([category, items]) => {
      if (items.length === 0) {
        return null;
      }

      const randomDish = items[Math.floor(Math.random() * items.length)];

      return {
        emoji: dishTypeEmoji[category] ?? "\u{1F37D}",
        name: randomDish.dishName,
        category:
          randomDish.dishType.charAt(0).toUpperCase() +
          randomDish.dishType.slice(1),
        to: `/recipe/view/${toSlug(randomDish.dishName)}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};

const ErrorPage = () => {
  const { data: user } = useGetAuthUserQuery();
  const { data: recipes = [] } = useGetRecipesQuery(undefined, {
    skip: !user,
  });

  const currentYear = new Date().getFullYear();
  const suggestionPills = useMemo(
    () => pickRandomDishByType(recipes),
    [recipes],
  );

  return (
    <div className={styles.page}>
      {backgroundEmojis.map(({ emoji, style }) => (
        <span
          className={styles.bgEmoji}
          key={`${emoji}-${JSON.stringify(style)}`}
          style={style}
        >
          {emoji}
        </span>
      ))}

      <nav className={styles.nav}>
        <Link className={styles.navLogo} to="/">
          Dish <em>Galeria</em>
        </Link>
        <Link className={styles.navBack} to="/">
          <svg
            aria-hidden="true"
            fill="none"
            height="14"
            viewBox="0 0 14 14"
            width="14"
          >
            <path
              d="M10 7H4M6 4L3 7l3 3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
          Back to Home
        </Link>
      </nav>

      <main className={styles.main}>
        <section className={styles.stage}>
          <div aria-label="404" className={styles.fourOhFour}>
            <div className={styles.fourOhFourText}>404</div>
            <div className={styles.dishZero}>
              <div className={styles.bowlWrap}>
                <div className={styles.steam}>
                  <div className={styles.steamLine} />
                  <div className={styles.steamLine} />
                  <div className={styles.steamLine} />
                </div>
                {"\u{1F372}"}
              </div>
            </div>
          </div>

          <div className={styles.errorBadge}>
            <svg
              aria-hidden="true"
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
            >
              <path
                d="M6 1L11 10H1L6 1Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
              <path
                d="M6 5v2M6 8.5v.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.2"
              />
            </svg>
            Page Not Found
          </div>

          <h1 className={styles.headline}>
            This recipe
            <br />
            seems to have <em>gone missing.</em>
          </h1>
          <p className={styles.subline}>
            The page you're looking for doesn't exist, was moved, or you may
            have followed a broken link. Let's get you back to the good stuff.
          </p>

          <div className={styles.actions}>
            <Link className={styles.btnHome} to="/">
              {"\u{1F3E0}"} Back to Home
            </Link>
          </div>

          {suggestionPills.length > 0 ? (
            <>
              <div className={styles.suggestionsLabel}>
                Maybe you were looking for...
              </div>
              <div className={styles.suggestions}>
                {suggestionPills.map((suggestion) => (
                  <Link
                    className={styles.suggestionPill}
                    key={`${suggestion.category}-${suggestion.name}`}
                    to={suggestion.to}
                  >
                    <div className={styles.pillEmoji}>{suggestion.emoji}</div>
                    <div>
                      <div className={styles.pillName}>{suggestion.name}</div>
                      <div className={styles.pillCat}>
                        {suggestion.category}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; {currentYear} <Link to="/">Dish Galeria</Link> {"\u00B7"} Collect
        recipes, all in one place.
      </footer>
    </div>
  );
};

export default ErrorPage;
