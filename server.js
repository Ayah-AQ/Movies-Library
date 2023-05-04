const express = require('express');
const app = express();
const data= require('./Data/data.json')
const PORT = 8000

// Home page endpoint
app.get('/', moviesHandler);
function moviesHandler(req,res){
    let result={};
    let newM = new Movie (data.title,data.poster_path,data.overview);
    result= newM;
    res.json(result);
}
function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}

// Favorite page endpoint
app.get('/fav', (req, res) => {
  res.send('Welcome to Favorite Page');
  // undefinedFunction()
});

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  res.status(404).json({ status: 404, responseText: 'Page not found' });
});

// Error handling middleware for 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
});


// Start the server
app.listen(8001,()=> 
console.log(`The app-location runs on localhost:${PORT}`)
);