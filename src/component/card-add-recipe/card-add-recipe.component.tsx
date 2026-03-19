import AddIcon from "../../assets/material-symbols--add.svg";

type CardAddProps = {
  onAddRecipeClick: () => void;
};

const CardAdd = ({ onAddRecipeClick }: CardAddProps) => (
  <div
    className="flex h-[214px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-stone-400 bg-[#fdf8f2] shadow-[0_4px_6px_-1px_rgba(100,116,139,0.5),0_2px_4px_-2px_rgba(100,116,139,0.5)] transition duration-300 ease-in-out hover:-translate-y-[5px] hover:cursor-pointer"
    onClick={onAddRecipeClick}
  >
    <img className="h-auto w-10" src={AddIcon} />
    <span className="text-2xl text-stone-500 hover:underline">
      Add New Dish
    </span>
  </div>
);

export default CardAdd;
