import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, num, id, deleteTodoByid, onClickEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{num}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => deleteTodoByid(id)}>
        <RiDeleteBinLine fill="#b74e4eb0" size={24} />
      </DeleteButton>

      <EditButton onClick={() => onClickEdit(id)} type="button">
        <RiEdit2Line fill="#3a783dab" size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
