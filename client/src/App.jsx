import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from the server
  useEffect(() => {
    const fetchTodos = async () => {
      var url = import.meta.env.api;
      try {
        const response = await axios.get(url+"todos");
        setTodos(response.data.data); // Assuming API response has a "data" field
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: newTodo, completed: false },
      ]);
      setNewTodo("");
      handleClose();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Roboto, sans-serif" }}>
      <h1>{import.meta.env.VITE_title || "todo"}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<span>➕</span>}
      >
        Add Todo
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Todo</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>
                    {todo.completed ? "Completed" : "Pending"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No todos yet!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            type="text"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoApp;
