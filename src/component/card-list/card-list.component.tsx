import { useWindowResize } from "@hooks/useWindowResize";
import type { DishDataType } from "@app-types/dish";

import Card from "@component/card/card.component";
import CardAdd from "@component/card-add-recipe/card-add-recipe.component";
import Spinner from "@component/spinner/spinner.component";

import { motion, AnimatePresence } from "framer-motion";
import NoResult from "@component/no-result/no-result.component";

type CardListProps = {
  dishData: DishDataType[];
  onCardClick: (dish: DishDataType) => void;
  searchField: string;
  onAddRecipeClick: () => void;
  isLoading: boolean;
};

const listClassName =
  "mb-4 grid grid-cols-5 h-[65vh] w-full gap-4 overflow-x-hidden overflow-y-auto pb-4 ";

const CardList = ({
  dishData,
  onCardClick,
  searchField,
  onAddRecipeClick,
  isLoading,
}: CardListProps) => {
  const { showComponent } = useWindowResize();
  const isSearching = searchField.trim() !== "";

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <AnimatePresence mode="wait">
          {dishData.length > 0 ? (
            <motion.div
              key="cardlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className={listClassName}>
                {dishData.map((dish) => (
                  <Card
                    key={dish.id}
                    dish={dish}
                    onClick={() => onCardClick(dish)}
                  />
                ))}
                {!isSearching && showComponent && (
                  <CardAdd onAddRecipeClick={onAddRecipeClick} />
                )}
              </div>
            </motion.div>
          ) : isSearching ? (
            <NoResult />
          ) : (
            !isSearching &&
            showComponent && (
              <div className={listClassName}>
                <CardAdd onAddRecipeClick={onAddRecipeClick} />
              </div>
            )
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default CardList;
