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
import { useAddTodoMutation, useUpdateTodoMutation } from "../../redux/api/api";
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

export interface IPropsTodo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: string;
}

interface IUpdateTodo {
  todo: IPropsTodo;
}

const UpdateTodoModal = ({ todo }: IUpdateTodo) => {
  const [updateTodo, setUpdateTodo] = useState(todo);
  const [updateTodoApi, { data, isLoading, isSuccess }] =
    useUpdateTodoMutation();
  console.log({ data });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    updateTodoApi(updateTodo);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Update your task that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
              Task
            </Label>
            <Input
              onChange={(e) =>
                setUpdateTodo({ ...updateTodo, title: e.target.value })
              }
              id="task"
              name="task"
              defaultValue={updateTodo.title}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              defaultValue={updateTodo.priority}
              onValueChange={(value: string) =>
                setUpdateTodo({ ...updateTodo, priority: value })
              }
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel value="high">High</SelectLabel> */}
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e) =>
                setUpdateTodo({ ...updateTodo, description: e.target.value })
              }
              id="description"
              defaultValue={updateTodo.description}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant="secondary">
                Save Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
