import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { error } from "console";


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pickup-fe3ae-default-rtdb.firebaseio.com/todos.json"
        );
        console.log("todos:", response?.data);
        const data = response?.data
        const todosArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setTodos(todosArray)
        console.log(todos);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [todos])
  // async function getTodos() {
  //   try {
  //     const response = await axios.get(
  //       "https://pickup-fe3ae-default-rtdb.firebaseio.com/todos.json"
  //     );
  //     console.log("todos:", response.data);
  //     const data = response.data
  //     const todosArray = Object.keys(data).map((key) => ({
  //       id: key,
  //       ...data[key],
  //     }));
  //     setTodos(todosArray);
  //   } catch (error) {
  //     console.error("Error fetching todos:", error);
  //     // Handle error here
  //   }
  // }


  // async function addTodo(todo: any) {
  //   try {
  //     const response = await axios.post(
  //       "https://pickup-fe3ae-default-rtdb.firebaseio.com/todos.json",
  //       todo
  //     );
  //     console.log("Data saved successfully:", response.data);

  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // }

  // async function deleteTodo(id: number) {
  //   console.log(id);
  //   try {
  //     const response = await axios.delete(
  //       `https://pickup-fe3ae-default-rtdb.firebaseio.com/todos/${id}.json`,

  //     );
  //     console.log("todo deleted successfully:", response);
  //     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //   }
  // }

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
    axios.post(
      "https://pickup-fe3ae-default-rtdb.firebaseio.com/todos.json",
      newTodoItem).then((response) => {
        console.log("todo saved successfully:", response.data);
        console.log(todos)
      }).catch((error) => console.error("Error saving data:", error))
    // addTodo(newTodoItem);
    // const updatedTodos = [...todos, newTodoItem];
    // setTodos(updatedTodos);
    // localStorage.setItem("TODO", JSON.stringify(updatedTodos));
    setNewTodo("");
  }

  // useEffect(() => {
  //   // Load todos from localStorage on component mount
  //   try {
  //     const storedTodos = localStorage.getItem("TODO");
  //     if (storedTodos) {
  //       setTodos(JSON.parse(storedTodos));
  //     }
  //   } catch (error) {
  //     console.error("Error loading data from localStorage:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save todos to localStorage whenever 'item' changes
  //   try {
  //     localStorage.setItem("TODO", JSON.stringify(todos));
  //   } catch (error) {
  //     console.error("Error saving data to localStorage:", error);
  //   }
  // }, [todos]);

  // Rest of your code...

  async function handleDelete(id: number) {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://pickup-fe3ae-default-rtdb.firebaseio.com/todos/${id}.json`,
      );
      console.log("todo deleted successfully:", response.data);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  async function handlePicked(id: number) {
    console.log(id);

    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, picked: !todoToUpdate?.picked };
      const response = await axios.put(
        `https://pickup-fe3ae-default-rtdb.firebaseio.com/todos/${id}.json`,
        updatedTodo
      );
      console.log("Todo updated successfully:", response.data);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, picked: !todo.picked } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }

    // setTodos((todos) =>
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, picked: !todo.picked } : todo
    //   )
    // );
    // setPicked((prevPickedItems) => ({
    //   ...prevPickedItems,
    //   [id]: !prevPickedItems[id],
    // }));
  }
  async function handleDeletePicked() {
    const pickedTodoIds = todos
      .filter((todo) => todo.picked)
      .map((todo) => todo.id);

    try {
      for (const id of pickedTodoIds) {
        await handleDelete(id);
      }
    } catch (error) {
      console.error("Error deleting picked todos:", error);
    }

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
