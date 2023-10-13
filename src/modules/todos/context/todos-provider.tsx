import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ITodo } from "../types";
import axios from "axios";



interface SharedData {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePicked: (id: number) => void;
  handleDelete: (id: number) => void;
  handleDeletePicked: () => void;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}


const context = React.createContext<SharedData | undefined>(undefined);

export const TodosProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
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
          ...data[key],
          id: key
        }));
        setTodos(todosArray)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) {
      return
    }
    const newTodoItem: ITodo = { picked: false, newTodo, id: Date.now() };
    axios.post(
      "https://pickup-fe3ae-default-rtdb.firebaseio.com/todos.json",
      newTodoItem).then((response) => {
        console.log("todo saved successfully:", response.data);
        setNewTodo("");
        setTodos((prevTodos) => ([...prevTodos, newTodoItem]))
        console.log(todos)
      }).catch((error) => console.error("Error saving data:", error))
  }


  const handleDelete = async (id: number) => {
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


  const handlePicked = async (id: number) => {
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
  }


  const handleDeletePicked = async () => {
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


  return (
    <context.Provider value={sharedData}>{children}</context.Provider>
  )
}


export const useTodos = (): SharedData => {
  const sharedData = useContext(context);
  if (!sharedData) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return sharedData;
}


