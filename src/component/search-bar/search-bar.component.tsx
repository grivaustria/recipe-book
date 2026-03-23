import styles from "./search-bar.module.scss";
import type { ChangeEventHandler } from "react";
import { IoIosSearch } from "react-icons/io";

type SearchBoxProps = {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({ onChangeHandler }: SearchBoxProps) => (
  <div className={styles.searchBar}>
    <IoIosSearch className="pointer-events-none absolute top-1/2 left-3.75 -translate-y-1/2 text-(--muted)" />
    <input
      type="text"
      id="searchInput"
      placeholder="Search by dish name…"
      onChange={onChangeHandler}
    />
  </div>
);

export default SearchBar;
