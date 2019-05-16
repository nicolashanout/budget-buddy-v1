const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

app.get('/', (req, res) => {
  res.send(`<h1>Welcome To BudgetBuddy</h1>`);
});

const port = process.env.PORT | 5500;

app.listen(port, () => {
  console.log(`Srver started on port ${port}`);
});
