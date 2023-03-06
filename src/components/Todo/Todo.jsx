import { Text } from 'components';
import { TodoWrapper, DeleteButton } from './Todo.styled';
import { RiDeleteBinLine } from 'react-icons/ri';
// RiEdit2Line EditButton

export const Todo = ({ text, num, id, deleteTodoByid }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{num}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => deleteTodoByid(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    </TodoWrapper>
  );
};
