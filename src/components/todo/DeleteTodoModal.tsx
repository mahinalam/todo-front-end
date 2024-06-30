import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITodo, addTodo } from "../../redux/features/todoSlice";
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../../redux/api/api";
// import { Select } from "../ui/select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { IPropsTodo } from "./updateTodoModal";

interface IDeleteTodo {
  todo: IPropsTodo;
}

const DeleteTodoModal = ({ todo }: IDeleteTodo) => {
  const [removeTodo, { isLoading, data, isSuccess, isError }] =
    useRemoveTodoMutation();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    removeTodo(todo._id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Task</DialogTitle>
          <DialogDescription>
            Are you sure want to remove task?
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={handleDelete}
                type="submit"
                variant="destructive"
              >
                Ok
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodoModal;
