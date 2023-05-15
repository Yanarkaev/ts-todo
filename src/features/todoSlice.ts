import { createSlice, current } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: number;
};

interface initState {
  todos: Todo[];
}

const initialState: initState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: any, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    completeTodo: (state, action) => {
      state.todos.map((item: Todo) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (item: Todo) => item.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
