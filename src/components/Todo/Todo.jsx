import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton, Label } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({
  text,
  num,
  id,
  deleteTodoByid,
  onClickEdit,
  onClickCheked,
  isCheked,
}) => {
  const isChek = isCheked ? 'rgb(84 147 84)' : 'inherit';
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{num}
      </Text>

      <Text style={{ color: isChek }}>{text}</Text>
      <DeleteButton type="button" onClick={() => deleteTodoByid(id)}>
        <RiDeleteBinLine fill="#b74e4eb0" size={24} />
      </DeleteButton>

      <EditButton onClick={() => onClickEdit(id)} type="button">
        <RiEdit2Line fill="#3a783dab" size={24} />
      </EditButton>
      <Label htmlFor="">
        <input
          type="checkbox"
          defaultChecked={isCheked}
          onClick={() => onClickCheked(id)}
        />
      </Label>
    </TodoWrapper>
  );
};
