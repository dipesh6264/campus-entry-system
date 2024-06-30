// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');
const otpRouter = require('./routes/otp');
const guardRouter = require('./routes/guardRoutes');
const visitorRouter = require('./routes/visitor');
const cabdriverRouter = require('./routes/cabdriver')

app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/otp', otpRouter);
app.use('/guard' ,guardRouter);
app.use('/visitor' ,visitorRouter);
app.use('/cabdriver' , cabdriverRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
