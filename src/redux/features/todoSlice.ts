import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: string;
}

interface IInitialState {
  todos: ITodo[];
}

const initialState: IInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push({ ...action.payload });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    toogleStateChange: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item._id === action.payload);
      task!.isCompleted = !task!.isCompleted;
      // Move completed todos to the bottom
      state.todos.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      //  state.todos = [...isCompleted]
    },
  },
});

console.log(todoSlice);

export const { addTodo, removeTodo, toogleStateChange } = todoSlice.actions;

export default todoSlice.reducer;
