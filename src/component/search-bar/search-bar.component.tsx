import type { ChangeEventHandler } from "react";

type SearchBoxProps = {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({ onChangeHandler }: SearchBoxProps) => (
  <input
    className="rounded-[20px] border-2 border-stone-500 bg-stone-50 px-4 py-1 text-lg text-stone-900 transition "
    type="search"
    placeholder="Search by dish name..."
    onChange={onChangeHandler}
  />
);

export default SearchBar;
