import React, { useState } from "react";
import styled from "styled-components";
import { InputField, TodoList } from "./components/index";
import { Todo } from "./model";
import { v4 as uuid } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);

  const handleAddTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: uuid(), todo, isDone: false, isEdit: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTasks;
    if (source.droppableId === "ActiveTasks") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "ActiveTasks") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTasks(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Header>Taskify</Header>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
        <TodoList
          completedTasks={completedTasks}
          todos={todos}
          setTodos={setTodos}
        />
      </Container>
    </DragDropContext>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f74c0;
`;

const Header = styled.header`
  text-transform: uppercase;
  font-size: 2.5em;
  margin: 1em 0;
  color: #fff;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 1em 0;
    font-size: 2em;
  }
`;

export default App;
