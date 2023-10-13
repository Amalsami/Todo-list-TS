import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { TodosProvider } from "../context/todos-provider";

export default function TodoList({
  children,
}: {
  children: ReactNode;
}): JSX.Element {

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
        <TodosProvider>{children}</TodosProvider>
      </Box>
    </Box>
  );
}


