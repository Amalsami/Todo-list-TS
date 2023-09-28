import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";
import TodoFooter from "./TodoFooter";
import { Box, Typography } from "@mui/material";

export interface Todo {
  picked: boolean;
  desc: string;
  id: number;
}
export default function TodoList(): JSX.Element {
  const [item, setItem] = useState<Todo[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [pickedItems, setPicked] = useState<{ [key: number]: boolean }>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newItem: Todo = { picked: false, desc, id: Date.now() };
    const updatedItems = [...item, newItem]; // Create a new array with the new item
    setItem(updatedItems);
    localStorage.setItem("TODO", JSON.stringify(updatedItems)); // Update the "TODO" key in localStorage
    setDesc("");
  }

  useEffect(() => {
    // Load todos from localStorage on component mount
    try {
      const storedTodos = localStorage.getItem("TODO");
      if (storedTodos) {
        setItem(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever 'item' changes
    try {
      localStorage.setItem("TODO", JSON.stringify(item));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [item]);

  // Rest of your code...

  function handleDelete(id: number) {
    setItem((item) => item.filter((i) => i.id !== id));
  }
  function handlePicked(id: number) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, picked: !item.picked } : item
      )
    );
    setPicked((prevPickedItems) => ({
      ...prevPickedItems,
      [id]: !prevPickedItems[id],
    }));
  }
  function handleDeletePicked() {
    setItem((items) => items.filter((item) => !item.picked)); // Remove picked items
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
      </Box>

      <TodoForm
        handleSubmit={handleSubmit}
        desc={desc}
        setDesc={setDesc}
      ></TodoForm>
      <TodoView
        handleDelete={handleDelete}
        pickedItems={pickedItems}
        handlePicked={handlePicked}
        item={item}
      ></TodoView>
      <TodoFooter
        handleDeletePicked={handleDeletePicked}
        setItem={setItem}
      ></TodoFooter>
    </Box>
  );
}
