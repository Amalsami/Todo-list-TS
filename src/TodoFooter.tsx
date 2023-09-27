import { Box, Button } from "@mui/material";
import React from "react";
import { Todo } from "./TodoList";

interface FooterProps {
  handleDeletePicked: () => void;
  setItem: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export default function TodoFooter({
  handleDeletePicked,
  setItem,
}: FooterProps) {
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
        onClick={() => setItem([])}
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
