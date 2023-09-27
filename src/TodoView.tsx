import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Todo } from "./TodoList";
interface ViewProps {
  handleDelete: (id: number) => void;
  handlePicked: (id: number) => void;
  pickedItems: { [key: number]: boolean };
  item: Todo[];
}
export default function TodoView({
  handleDelete,
  handlePicked,
  pickedItems,
  item,
}: ViewProps) {
  return (
    <>
      {item.map((item) => (
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
            onClick={() => handlePicked(item.id)}
            sx={{
              cursor: "pointer",
              textDecoration: pickedItems[item.id] ? "line-through" : "none",
            }}
          >
            {item.desc}
          </Typography>
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={() => handleDelete(item?.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </>
  );
}
