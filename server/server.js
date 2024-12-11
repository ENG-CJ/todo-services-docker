const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(cors())
app.use(express.json());

// Mock data: List of todos
const todos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build Todo App", completed: false },
  { id: 3, title: "Set up Node.js server", completed: true }
];

// GET endpoint to fetch todos
app.get('/todos', (req, res) => {
  res.json({ success: true, data: todos });
});

// Start the server
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
