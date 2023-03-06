import { nanoid } from 'nanoid';
import { useState } from 'react';
import { SearchForm, Grid, GridItem, Todo } from 'components';
// Grid, GridItem, SearchForm, EditForm,Todo
export const Todos = () => {
  const [todos, setTodos] = useState([]);

  const handlSubmit = text => {
    const todo = {
      id: nanoid(),
      text,
    };

    setTodos(prevTodos => [...prevTodos, todo]);
  };

  return (
    <>
      <SearchForm onSubmit={handlSubmit} />
      <Grid>
        {todos.map(({ id, text }, i) => {
          return (
            <GridItem key={id}>
              <Todo text={text} num={i + 1} />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};
