import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { SearchForm, Grid, GridItem, Todo } from 'components';
// Grid, GridItem, SearchForm, EditForm,Todo
export const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) ?? []
  );
  // const [isEditing, setIsEditing] = useState(false);
  // const [currentTodo, setCurrentTodo] = useState([]);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handlSubmit = text => {
    const todo = {
      id: nanoid(),
      text,
    };

    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const deleteTodo = idTodo => {
    const filterTodo = todos.filter(({ id }) => id !== idTodo);
    setTodos(filterTodo);
  };

  return (
    <>
      <SearchForm onSubmit={handlSubmit} />
      <Grid>
        {todos.map(({ id, text }, i) => (
          <GridItem key={id}>
            <Todo text={text} num={i + 1} id={id} deleteTodoByid={deleteTodo} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
