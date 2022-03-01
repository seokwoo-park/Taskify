import React from "react";
import styled from "styled-components";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList = ({ todos, setTodos }: Props) => {
  const handleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      {todos &&
        todos.map((todo) => (
          <TodoCard key={todo.id}>
            {todo.isDone ? <s>{todo.todo}</s> : <span>{todo.todo}</span>}
            <div>
              <i>
                <AiFillEdit />
              </i>
              <i onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </i>
              <i onClick={() => handleDone(todo.id)}>
                <MdDone />
              </i>
            </div>
          </TodoCard>
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 90%;
`;

const TodoCard = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29.5%;
  border-radius: 5px;
  padding: 1em;
  margin: 1em 0;
  flex-wrap: wrap;
  background-image: url("https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?ext=jpg&size=626");

  span,
  s {
    flex: 1;
    padding: 5px;
    border: none;
    font-size: 1.25em;

    &:focus {
      outline: none;
    }
  }

  i {
    margin-left: 10px;
    font-size: 1.5em;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    width: 40%;
    flex-direction: column;
  }
`;

export default TodoList;