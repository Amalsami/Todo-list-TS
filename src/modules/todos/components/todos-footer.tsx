import { Box, Button } from "@mui/material";
import { useTodos } from "../context/todos-provider";

export default function TodoFooter() {

  const { handleDeletePicked, setTodos } = useTodos();
  return (
    <Box
      component="div"
      sx={{
        padding: "20px",
        display: "flex",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={() => setTodos([])}
      >
        Remove all
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
