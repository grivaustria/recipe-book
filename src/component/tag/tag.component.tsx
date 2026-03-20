type IDishTypeTag = {
  dishType: "all" | "fish" | "meat" | "veggies" | "dessert";
  isActive: boolean;
  onClick: (dishType: string) => void;
  className?: string;
};

const DishTypeTag = ({
  dishType,
  isActive,
  onClick,
  className,
}: IDishTypeTag) => (
  <div
    className={`${className ?? ""} select-none rounded-[20px] px-3 py-2 text-xs shadow-[2px_2px_2px_0_rgba(0,0,0,0.5)] transition hover:cursor-pointer hover:opacity-70 md:text-base ${
      isActive ? "bg-[#301411] text-stone-50" : "bg-transparent text-stone-900"
    }`}
    onClick={() => onClick(dishType)}
  >
    {dishType.charAt(0).toUpperCase() + dishType.slice(1)}
  </div>
);

export default DishTypeTag;
