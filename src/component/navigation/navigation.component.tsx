import type { ChangeEventHandler } from "react";
import SearchBar from "../search-bar/search-bar.component";

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
  <div className="flex w-full flex-col items-center gap-4 xl:max-w-[910px] xl:flex-row xl:justify-center xl:gap-2 2xl:max-w-[1200px] 2xl:gap-4">
    <div className="flex items-center justify-center gap-2">
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
          <div
            key={dishType}
            className={`select-none rounded-[20px] px-3 py-2 text-xs shadow-[2px_2px_2px_0_rgba(0,0,0,0.5)] transition hover:cursor-pointer hover:opacity-70 md:text-base ${
              isActive
                ? "bg-[#301411] text-stone-50"
                : "bg-transparent text-stone-900"
            }`}
            onClick={() => onDishTypeChange(nextValue)}
          >
            {dishType.charAt(0).toUpperCase() + dishType.slice(1)}
          </div>
        );
      })}
    </div>
    <SearchBar onChangeHandler={onSearchChange} />
  </div>
);

export default Navigation;
