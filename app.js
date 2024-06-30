const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();

const app = express();
const server = http.createServer(app);
// Initialize Socket.IO
const io = socketIo(server);

// Database configuration
const db = require('./config/db');
db();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const codeRoutes = require('./routes/codeRoutes');
const websocketRoutes = require('./routes/websocketRoutes');
app.use('/', codeRoutes);
websocketRoutes(io); // Pass io object to WebSocket routes

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
