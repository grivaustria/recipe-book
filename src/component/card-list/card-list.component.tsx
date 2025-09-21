import { useWindowResize } from "../../hooks/useWindowResize";
import { CardListContainer } from "./card-list.styles";
import type { DishDataType } from "../../types/dish.type";

import Card from "../card/card.component";
import CardAdd from "../card-add-recipe/card-add-recipe.component";
import Spinner from "../spinner/spinner.component";

import { motion, AnimatePresence } from "framer-motion";
import NoResult from "../no-result/no-result.component";

type CardListProps = {
  dishData: DishDataType[];
  onCardClick: (dish: DishDataType) => void;
  searchField: string;
  onAddRecipeClick: () => void;
  isLoading: boolean;
};

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
              <CardListContainer>
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
              </CardListContainer>
            </motion.div>
          ) : isSearching ? (
            <NoResult />
          ) : (
            !isSearching &&
            showComponent && (
              <motion.div
                key="cardaddonly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <CardListContainer>
                  <CardAdd onAddRecipeClick={onAddRecipeClick} />
                </CardListContainer>
              </motion.div>
            )
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default CardList;
