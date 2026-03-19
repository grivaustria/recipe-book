import type { DishDataType } from "../../types/dish.type";

type CardProps = {
  dish: DishDataType;
  onClick: () => void;
};

const Card = ({ dish, onClick }: CardProps) => {
  const { dishName, dishImage, dishType } = dish;

  return (
    <div
      className="flex h-[214px] w-[288px] max-w-[288px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-[0_4px_6px_-1px_rgba(100,116,139,0.5),0_2px_4px_-2px_rgba(100,116,139,0.5)] transition duration-300 ease-in-out hover:-translate-y-[5px] hover:cursor-pointer"
      onClick={onClick}
    >
      <img
        className="h-[150px] w-full shrink-0 object-cover"
        src={dishImage}
        alt={`dish-${dishName.replace(/\s+/g, "")}`}
      />
      <div className="flex w-[90%] flex-1 flex-col justify-start gap-1 px-3 py-2">
        <span className="truncate text-2xl font-bold hover:underline">
          {dishName}
        </span>
        <span className="capitalize">{dishType}</span>
      </div>
    </div>
  );
};

export default Card;
