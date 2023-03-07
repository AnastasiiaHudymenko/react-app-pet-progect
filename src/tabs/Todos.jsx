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

  const handlClickEdit = todoId => {
    setIsEditing(true);
    const chooseTodo = todos.filter(({ id }) => id === todoId);
    setCurrentTodo(chooseTodo);
  };

  const handlUpdateTodo = (e, currentTodo) => {
    e.preventDefault();

    const [{ id, text }] = currentTodo;

    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { id, text };
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
      prevTodo.map(({ id, text: oldText }) => {
        if (oldText !== text) {
          return { id, text };
        }
        return { id, oldText };
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
        {todos.map(({ id, text }, i) => (
          <GridItem key={id}>
            <Todo
              text={text}
              num={i + 1}
              id={id}
              deleteTodoByid={deleteTodo}
              onClickEdit={handlClickEdit}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
