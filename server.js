const express = require('express');
// const routes = require('./routes)
const connection = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
//app.use(routes);

// Default response for any other request (Not Found)
app.use((req, res) => { 
    res.status(404).end();
  });
  
  // Start server after DB connection
  connection.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
  