import React from "react";
import Container from "../components/ui/Container";
import TodoContainer from "../components/todo/TodoContainer";

const Todo = () => {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold my-10">My Todo</h1>
      <TodoContainer />
    </Container>
  );
};

export default Todo;
