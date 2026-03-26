import type { DishDataType } from "@app-types/dish";
import LazyImage from "@component/lazy-image/LazyImage";

type CardProps = {
  dish: DishDataType;
  onClick: () => void;
};

const Card = ({ dish, onClick }: CardProps) => {
  const { dishName, dishImage, dishType } = dish;
  const fallbackEmoji =
    dishType === "fish"
      ? "\u{1F41F}"
      : dishType === "meat"
        ? "\u{1F356}"
        : dishType === "veggies"
          ? "\u{1F966}"
          : dishType === "dessert"
            ? "\u{1F36E}"
            : "\u{1F37D}";

  return (
    <div
      className="flex h-53.5 w-[288px] max-w-[288px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-[0_4px_6px_-1px_rgba(100,116,139,0.5),0_2px_4px_-2px_rgba(100,116,139,0.5)] transition duration-300 ease-in-out hover:-translate-y-1.25 hover:cursor-pointer"
      onClick={onClick}
    >
      {dishImage ? (
        <LazyImage
          className="h-37.5 w-full shrink-0 object-cover"
          wrapperClassName="h-37.5 w-full shrink-0"
          src={dishImage}
          alt={`dish-${dishName.replace(/\s+/g, "")}`}
        />
      ) : (
        <div className="flex h-37.5 w-full shrink-0 items-center justify-center bg-stone-100 text-5xl">
          {fallbackEmoji}
        </div>
      )}
      <div className="flex w-full flex-1 flex-col justify-start  px-3 py-2">
        <span className="truncate text-xl font-bold hover:underline">
          {dishName}
        </span>
        <span className="capitalize">{dishType}</span>
      </div>
    </div>
  );
};

export default Card;
