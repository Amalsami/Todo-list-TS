import { Box, Button } from "@mui/material";
import React from "react";
import { Todo, useSharedData } from "./TodoList";

// interface FooterProps {
//   handleDeletePicked: () => void;
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }
export default function TodoFooter() {
  //   {
  //   handleDeletePicked,
  //   setTodos,
  // }: FooterProps
  const { handleDeletePicked, setTodos } = useSharedData();
  return (
    <Box
      component="div"
      sx={{
        padding: "20px",
        display: "flex",
        gap: "15px",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={() => setTodos([])}
      >
        Remove all{" "}
      </Button>
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={handleDeletePicked}
      >
        Remove Picked
      </Button>
    </Box>
  );
}
