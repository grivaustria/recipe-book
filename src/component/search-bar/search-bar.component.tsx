import type { ChangeEventHandler } from "react";

type SearchBoxProps = {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({ onChangeHandler }: SearchBoxProps) => (
  <input
    className="w-[90%] rounded-[20px] border-2 border-stone-500 bg-stone-50 px-4 py-3 text-xs text-stone-900 transition md:text-lg xl:w-[600px] 2xl:w-full"
    type="search"
    placeholder="Search by dish name..."
    onChange={onChangeHandler}
  />
);

export default SearchBar;
