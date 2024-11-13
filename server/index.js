const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // Allows requests from your React app on a different port
app.use(bodyParser.json()); // Parses JSON request bodies

// Sample data storage (you can later replace this with a database)
let events = [
  { id: 1, title: 'Workday', date: '2024-11-13' },
  { id: 2, title: 'Day Off', date: '2024-11-14' }
];

// Routes
// Root route to check server status
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Add a new event
app.post('/events', (req, res) => {
  const newEvent = req.body;
  newEvent.id = events.length + 1; // Simple ID increment, better if done by a database
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Delete an event
app.delete('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  events = events.filter(event => event.id !== eventId);
  res.status(204).send();
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
