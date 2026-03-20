import type { ChangeEventHandler } from "react";
import SearchBar from "../search-bar/search-bar.component";
import DishTypeTag from "../tag/tag.component";

type NavigationProps = {
  selectedDishType: string;
  onDishTypeChange: (dishType: string) => void;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
};

const dishTypes = ["all", "fish", "meat", "veggies", "dessert"] as const;

const Navigation = ({
  selectedDishType,
  onDishTypeChange,
  onSearchChange,
}: NavigationProps) => (
  <div className="flex flex-col items-center gap-2 mb-2">
    <div className="flex gap-2 ml-5">
      {dishTypes.map((dishType) => {
        const isActive = selectedDishType === dishType;
        const nextValue =
          dishType === "all"
            ? selectedDishType === "all"
              ? ""
              : "all"
            : selectedDishType === dishType
              ? "all"
              : dishType;

        return (
          <DishTypeTag
            key={dishType}
            dishType={dishType}
            isActive={isActive}
            onClick={() => onDishTypeChange(nextValue)}
          />
        );
      })}
    </div>
    <SearchBar onChangeHandler={onSearchChange} />
  </div>
);

export default Navigation;
