import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';

export const EditForm = ({ onCancel, currentTodo, onChange, onUpdate }) => {
  return (
    <SearchFormStyled onSubmit={e => onUpdate(e, currentTodo)}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        onChange={e => onChange(e.target.value)}
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo[0].text}
        autoFocus
      />
    </SearchFormStyled>
  );
};
