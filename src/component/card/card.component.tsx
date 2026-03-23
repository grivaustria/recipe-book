import type { DishDataType } from "@app-types/dish";

type CardProps = {
  dish: DishDataType;
  onClick: () => void;
};

const Card = ({ dish, onClick }: CardProps) => {
  const { dishName, dishImage, dishType } = dish;

  return (
    <div
      className="flex h-53.5 w-[288px] max-w-[288px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-[0_4px_6px_-1px_rgba(100,116,139,0.5),0_2px_4px_-2px_rgba(100,116,139,0.5)] transition duration-300 ease-in-out hover:-translate-y-1.25 hover:cursor-pointer"
      onClick={onClick}
    >
      <img
        className="h-37.5 w-full shrink-0 object-cover"
        src={dishImage}
        alt={`dish-${dishName.replace(/\s+/g, "")}`}
      />
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
