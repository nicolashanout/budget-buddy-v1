const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

// Init Middleware
app.use(express.json({ exnteded: false })); //bodyparser now in express by default

app.get('/', (req, res) => {
  res.send(`<h1>Welcome To BudgetBuddy</h1>`);
});

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/budgets', require('./routes/api/budgets/budgets'));
app.use('/api/budgets/accounts', require('./routes/api/budgets/accounts'));

//start server
const port = process.env.PORT | 5500;

app.listen(port, () => {
  console.log(`Srver started on port ${port}`);
});
