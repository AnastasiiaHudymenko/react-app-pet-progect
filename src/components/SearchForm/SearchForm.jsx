import { useState } from "react";

import { FiSearch } from "react-icons/fi";
import { FormBtn, InputSearch, SearchFormStyled } from "./SearchForm.styled";

export const SearchForm = ({ onSubmit }) => {
  const [search, setSearch] = useState("");

  const handlChangeInput = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
    setSearch("");
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        value={search}
        onChange={handlChangeInput}
        required
        autoFocus
      />
    </SearchFormStyled>
  );
};
