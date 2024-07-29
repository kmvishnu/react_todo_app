import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useTodo } from "../../Hooks/useTodo";

const AddTodoDialog = ({ open, onClose, onSuccess }) => {
  const [todo, setTodo] = useState("");
  const [details, setDetails] = useState("");
  const [constantTodo, setConstantTodo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { addTodo, loading } = useTodo();

  const handleTodoChange = (event) => {
    if (event.target.value.length <= 20) {
      setTodo(event.target.value);
    }
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleConstantTodoChange = (event) => {
    setConstantTodo(event.target.checked);
  };

  const handleSubmit = async () => {
    if (todo.trim()) {
      try {
        const res = await addTodo(todo, details);
        if (res && res.status === 200) {
          // Clear the fields after successful submission
          setErrorMessage("");
          setTodo("");
          setDetails("");
          setConstantTodo(false);
          onClose();
          onSuccess(); // Call onSuccess to trigger fetching the latest todos
        } else {
          setErrorMessage("Failed to add todo. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to add todo. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>Add Todo</div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="todo"
          label="Enter todo"
          type="text"
          fullWidth
          variant="standard"
          value={todo}
          onChange={handleTodoChange}
          helperText={`${todo.length}/20`}
          error={todo.length === 20}
        />
        <TextField
          margin="dense"
          id="details"
          label="Details"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={details}
          onChange={handleDetailsChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={constantTodo}
              onChange={handleConstantTodoChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Constant?"
        />
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!todo.trim() || loading}
          >
            <AddIcon />
            {loading ? "Adding..." : "Add"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
