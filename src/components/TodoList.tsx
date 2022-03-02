import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTasks: Todo[];
};

const TodoList = ({ todos, setTodos, completedTasks }: Props) => {
  const [editValue, setEditValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editValue, isEdit: false } : todo
      )
    );
  };

  const handleEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
      )
    );
  };

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
      <Droppable droppableId="ActiveTasks">
        {(provided) => (
          <ActiveTasks ref={provided.innerRef} {...provided.droppableProps}>
            <h3>Active Tasks</h3>
            {todos &&
              todos.map((todo, index) => (
                <Draggable draggableId={todo.id} index={index} key={index}>
                  {(provided) => (
                    <TodoCard
                      key={todo.id}
                      onSubmit={(e) => handleSubmit(e, todo.id)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {todo.isEdit ? (
                        <input
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder="Press enter to submit.."
                          autoFocus
                        />
                      ) : todo.isDone ? (
                        <s>{todo.todo}</s>
                      ) : (
                        <span>{todo.todo}</span>
                      )}
                      <div>
                        <i onClick={() => handleEdit(todo.id)}>
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
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ActiveTasks>
        )}
      </Droppable>

      <Droppable droppableId="CompletedTasks">
        {(provided) => (
          <CompletedTasks ref={provided.innerRef} {...provided.droppableProps}>
            <h3>Completed Tasks</h3>
            {completedTasks &&
              completedTasks.map((todo, index) => (
                <Draggable draggableId={todo.id} index={index} key={index}>
                  {(provided) => (
                    <TodoCard
                      key={todo.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <s>{todo.todo}</s>
                    </TodoCard>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </CompletedTasks>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1em;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActiveTasks = styled.div`
  display: flex;
  flex-direction: column;
  width: 47.5%;
  padding: 1em;
  border-radius: 5px;
  background-color: rgb(50, 195, 205);
  gap: 1em;

  h3 {
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompletedTasks = styled(ActiveTasks)`
  background-color: rgb(235, 103, 80);
`;

const TodoCard = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 1em;
  background-image: url("https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?ext=jpg&size=626");
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px #000;
  }

  input {
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  span,
  s {
    word-break: break-all;
    flex: 1;
    padding: 5px;
    border: none;
    font-size: 1.25em;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  i {
    margin-left: 10px;
    font-size: 1.5em;
    cursor: pointer;
  }
`;

export default TodoList;
