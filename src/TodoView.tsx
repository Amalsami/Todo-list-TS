import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Todo, useSharedData } from "./TodoList";
interface ViewProps {
  handleDelete: (id: number) => void;
  handlePicked: (id: number) => void;
  // pickedTodos: { [key: number]: boolean };
  todos: Todo[];
}
export default function TodoView() {
  //   {
  //   handleDelete,
  //   handlePicked,
  //   // pickedTodos,
  //   todos,
  // }: ViewProps
  const { handleDelete, handlePicked, todos } = useSharedData();

  return (
    <>
      {todos.map((todo) => (
        <Box
          sx={{
            backgroundColor: "lightgray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            margin: "10px 0",
            gap: "20px",
          }}
        >
          <Typography
            paragraph
            component="span"
            onClick={() => handlePicked(todo.id)}
            sx={{
              cursor: "pointer",
              textDecoration: todo.picked ? "line-through" : "none",
              opacity: todo.picked ? 0.5 : 1,
            }}
          >
            {todo.newTodo}
          </Typography>
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={() => handleDelete(todo?.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </>
  );
}
