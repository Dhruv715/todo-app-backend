require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const todoRoutes = require('./routes/todo.routes');
const { default: mongoose } = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Use CORS middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://todo-app-xi-seven-13.vercel.app'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// Routes
app.use('/api/todos', todoRoutes);

// Database Connection
const mongoURI = process.env.MONGO_URI; // Access MONGO_URI from .env
if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1); // Exit if MONGO_URI is missing
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
