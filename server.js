const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect to database
connectDB();

// Init Middleware
app.use(express.json({ exnteded: false })); //bodyparser now in express by default

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/budgets', require('./routes/api/budgets/budgets'));
app.use('/api/budgets/accounts', require('./routes/api/budgets/accounts'));
app.use(
  '/api/budgets/transactions',
  require('./routes/api/budgets/transactions')
);

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//start server
const port = process.env.PORT | 5500;

app.listen(port, () => {
  console.log(`Srver started on port ${port}`);
});
