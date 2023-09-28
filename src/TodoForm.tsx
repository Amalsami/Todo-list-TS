import { Box, Button, TextField } from "@mui/material";
import React from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
}
export default function TodoForm({
  handleSubmit,
  setDesc,
  desc,
}: FormProps): JSX.Element {
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
        value={desc}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDesc(event.target.value);
        }}
      ></TextField>
      <Button type="submit" size="small" variant="contained">
        Add
      </Button>
    </Box>
  );
}
