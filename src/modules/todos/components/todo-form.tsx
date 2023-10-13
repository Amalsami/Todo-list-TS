import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useTodos } from "../context/todos-provider";

export default function TodoForm(): JSX.Element {

  const { handleSubmit, setNewTodo, newTodo } = useTodos();
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
      />
      <Button type="submit" size="small" variant="contained">
        Add
      </Button>
    </Box>
  );
}
