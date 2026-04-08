const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Get all projects
app.get('/api/projects', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Save a new project
app.post('/api/projects', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const newProject = { id: Date.now(), ...req.body };
  data.push(newProject);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(newProject);
});

app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));