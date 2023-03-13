import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { SearchForm, Grid, GridItem, Todo, EditForm } from 'components';

export const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState([]);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handlClickIsCheked = id => {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, isCheked: !todo.isCheked } : todo
      )
    );
  };

  const handlSubmit = text => {
    const todo = {
      id: nanoid(),
      text,
      isCheked: false,
    };

    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const deleteTodo = idTodo => {
    const filterTodo = todos.filter(({ id }) => id !== idTodo);
    setTodos(filterTodo);
  };

  const handlClickEdit = todoId => {
    setIsEditing(true);
    const chooseTodo = todos.filter(({ id }) => id === todoId);
    setCurrentTodo(chooseTodo);
  };

  const handlUpdateTodo = (e, currentTodo) => {
    e.preventDefault();

    const [{ id, text, isCheked }] = currentTodo;

    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { id, text, isCheked };
        }
        return todo;
      })
    );
    e.target.elements.edit.value = '';
    setIsEditing(false);
  };

  const handlCancel = () => {
    setIsEditing(false);
  };

  const handlChangeTodo = text => {
    setCurrentTodo(prevTodo =>
      prevTodo.map(({ id, text: oldText, isCheked }) => {
        if (oldText !== text) {
          return { id, text, isCheked };
        }
        return { id, oldText, isCheked };
      })
    );
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          onCancel={handlCancel}
          onUpdate={handlUpdateTodo}
          onChange={handlChangeTodo}
          currentTodo={currentTodo}
        />
      ) : (
        <SearchForm onSubmit={handlSubmit} />
      )}

      <Grid>
        {todos.map(({ id, text, isCheked }, i) => (
          <GridItem key={id}>
            <Todo
              isCheked={isCheked}
              text={text}
              num={i + 1}
              id={id}
              deleteTodoByid={deleteTodo}
              onClickEdit={handlClickEdit}
              onClickCheked={handlClickIsCheked}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
