import { Box, Button, Typography } from "@mui/material";
import { useTodos } from "../context/todos-provider";

export default function TodoView() {

  const { handleDelete, handlePicked, todos } = useTodos();

  return (
    <>
      {todos.map((todo) => (
        <Box
          key={todo.id}
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
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </>
  );
}
