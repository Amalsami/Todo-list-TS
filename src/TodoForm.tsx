import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useSharedData } from "./TodoList";

// interface FormProps {
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   setNewTodo: React.Dispatch<React.SetStateAction<string>>;
//   newTodo: string;
// }
export default function TodoForm(): JSX.Element {
// {
//   handleSubmit,
//   setNewTodo,
//   newTodo,
// }: FormProps
  const { handleSubmit, setNewTodo, newTodo } = useSharedData();
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: "10px",
        gap: "15px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={newTodo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewTodo(event.target.value);
        }}
      ></TextField>
      <Button type="submit" size="small" variant="contained">
        Add
      </Button>
    </Box>
  );
}
