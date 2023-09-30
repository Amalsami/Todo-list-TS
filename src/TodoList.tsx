import React, { ReactNode, useContext, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";
import TodoFooter from "./TodoFooter";
import { Box, Typography } from "@mui/material";

export interface Todo {
  picked: boolean;
  newTodo: string;
  id: number;
}
interface SharedData {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePicked: (id: number) => void;
  handleDelete: (id: number) => void;
  handleDeletePicked: () => void;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const context = React.createContext<SharedData | undefined>(undefined);
export default function TodoList({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  // const [pickedTodos, setPicked] = useState<{ [key: number]: boolean }>({});
  const sharedData = {
    handleSubmit,
    handlePicked,
    handleDelete,
    handleDeletePicked,
    newTodo,
    setNewTodo,
    todos,
    setTodos,
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodoItem: Todo = { picked: false, newTodo, id: Date.now() };
    const updatedTodos = [...todos, newTodoItem]; // Create a new array with the new Todos
    setTodos(updatedTodos);
    localStorage.setItem("TODO", JSON.stringify(updatedTodos)); // Update the "TODO" key in localStorage
    setNewTodo("");
  }

  useEffect(() => {
    // Load todos from localStorage on component mount
    try {
      const storedTodos = localStorage.getItem("TODO");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever 'item' changes
    try {
      localStorage.setItem("TODO", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [todos]);

  // Rest of your code...

  function handleDelete(id: number) {
    setTodos((todo) => todo.filter((i) => i.id !== id));
  }
  function handlePicked(id: number) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, picked: !todo.picked } : todo
      )
    );
    // setPicked((prevPickedItems) => ({
    //   ...prevPickedItems,
    //   [id]: !prevPickedItems[id],
    // }));
  }
  function handleDeletePicked() {
    setTodos((todos) => todos.filter((todo) => !todo.picked)); // Remove picked items
  }
  return (
    <Box
      component="div"
      sx={{
        width: "400px",
        padding: "20px",
        margin: "50px auto",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">My TodoList App with ReactTS</Typography>
        <Typography>Add a Todo</Typography>
        <context.Provider value={sharedData}>{children}</context.Provider>
      </Box>
    </Box>
  );
}

export function useSharedData(): SharedData {
  const sharedData = useContext(context);
  if (!sharedData) {
    throw new Error("useSharedData must be used within a MyProvider");
  }
  return sharedData;
}
