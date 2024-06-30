import React, { FormEvent, useState } from "react";
import TodoCart from "./TodoCart";
import { Button } from "../ui/button";
import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import { useAppSelector } from "../../redux/hooks";
import { useAddTodoMutation, useGetTodoQuery } from "../../redux/api/api";
import { ITodo } from "../../redux/features/todoSlice";

const TodoContainer = () => {
  //   const todos = useAppSelector((state) => state.todo.todos);
  const [priority, setPriority] = useState("");
  const { data, isLoading, isError } = useGetTodoQuery(priority);
  const todos = data?.data;
  console.log({ todos });
  const newTodos =
    todos &&
    [...todos].sort(
      (a: ITodo, b: ITodo) => Number(a.isCompleted) - Number(b.isCompleted)
    );

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  //   const dispatch = useAppDispatch();
  const [
    addTodo,
    { data: addTodoData, isError: isTodoAddError, isLoading: isTodoAddLoading },
  ] = useAddTodoMutation();
  console.log("addTodoData", data, isError);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const taskDetails = {
      title: task,
      description,
      priority,
      isCompleted: false,
    };

    addTodo(taskDetails);
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal
          setTask={setTask}
          handleSubmit={handleSubmit}
          setDescription={setDescription}
          setPriority={setPriority}
        />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-foreground w-full h-full rouned-xl p-[5px] space-y-3">
        {/* <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center">
          <p>There is no task pending</p>{" "}
        </div> */}
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {newTodos &&
            newTodos.map((todo: ITodo) => (
              <TodoCart key={todo._id} item={todo} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
