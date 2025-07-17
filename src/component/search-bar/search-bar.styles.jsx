import styled from "styled-components";

export const SearchBox = styled.input.attrs({
  type: "search",
  placeholder: "Search by dish name...",
})`
  background-color: #f8f8f8;
  border: 3px solid #878787;
  border-radius: 20px;
  padding: 0.75rem 1rem;
  width: 600px;
  font-size: 18px;
  transition: 0.2s width ease-in-out;

`;
