import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../redux/hooks";
import {
  ITodo,
  removeTodo,
  toogleStateChange,
} from "../../redux/features/todoSlice";
import UpdateTodoModal from "./updateTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
import { useToogleStateChangeMutation } from "../../redux/api/api";

interface IItemProps {
  item: ITodo;
}

const TodoCart = ({ item }: IItemProps) => {
  const { _id: id, title, description, isCompleted, priority } = item;
  const [toogleStateChange, { data }] = useToogleStateChangeMutation();

  const handleToogleChange = (e: FormEvent) => {
    const toogleData = {
      id: item._id,
      body: { ...item, isCompleted: !isCompleted },
    };

    toogleStateChange(toogleData);
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3">
      <input
        onClick={handleToogleChange}
        className="mr-3"
        type="checkbox"
        defaultChecked={item.isCompleted}
        name="toogle"
        id="toogle"
      />
      <p className="font-semibold flex-1">{title}</p>
      <div className="flex-1 flex justify-center items-center gap-2">
        <div
          className={`size-3 rounded-full
           ${priority?.toLowerCase() === "high" ? "bg-green-500" : null}
           ${priority?.toLowerCase() === "medium" ? "bg-yellow-500" : null}
           ${priority?.toLowerCase() === "low" ? "bg-red-500" : null}
           `}
        ></div>
        <p>{priority}</p>
      </div>

      <p className="flex-1">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </p>
      <p className="flex-[2]">{description}</p>
      <div className="space-x-5">
        <DeleteTodoModal todo={item} />
        <UpdateTodoModal todo={item}></UpdateTodoModal>
      </div>
    </div>
  );
};

export default TodoCart;
