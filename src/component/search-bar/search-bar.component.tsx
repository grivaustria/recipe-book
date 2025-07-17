import type { ChangeEventHandler } from "react";

import { SearchBox } from "./search-bar.styles";

type SearchBoxProps = {
    onChangeHandler: ChangeEventHandler<HTMLInputElement>
}
const SearchBar = ({onChangeHandler}: SearchBoxProps) => {
    return (
        <SearchBox onChange={onChangeHandler} />
    )
}
 
export default SearchBar;