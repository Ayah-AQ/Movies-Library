'use strict'

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const data= require('./Data/data.json')
require('dotenv').config();
const apiKey = process.env.APIkey;


const app = express();
const PORT = 8000
app.use(cors());

//Routes
app.get('/', moviesHandler);
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/genre', genreHandler);
app.get('/upComing', upComingMovieHandler);


 

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

function Movie2(id,title,release_date,poster_path,overview){
  this.id=id;
  this.title=title;
  this.release_date=release_date;
  this.poster_path=poster_path;
  this.overview=overview;
}

//Trending
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
function trendingHandler (req,res){
  axios.get(TRENDING_URL)
  .then((result)=>{

      let dataTrend = result.data.results.map((trending)=>{
          return new Movie2(trending.id, trending.title,trending.release_date,trending.poster_path,trending.overview)
      })
      res.json(dataTrend);
  })
  .catch((err)=>{
      console.log(err);
  })

} 

// Search
async function searchHandler(req, res) {
  const searchQuery = req.query.search;
  const data=await axios.get(`https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query=${searchQuery}`)
  console.log(data.data)
    res.status(200).json({
      results:  data.data
    })
}

// Genre
function genreHandler (req,res){
  let genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  axios.get(genreUrl)
  .then((result)=>{

      res.json(result.data.genres);
  })
  .catch((err)=>{
      console.log(err);
  })

} 
// Upcoming Movie
function upComingMovieHandler (req,res){
  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
  axios.get(url)
  .then((result)=>{

      let dataUpcomingMovie = result.data.results.map((result)=>{
          return new Movie2(result.original_title,result.overview)
      })

      res.json(dataUpcomingMovie);
  })
  .catch((err)=>{
      console.log(err);
  })

} 

// Favorite page endpoint
app.get('/fav', (req, res) => {
  res.send('Welcome to Favorite Page');
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
app.listen(8000,()=> 
console.log(`The app-location runs on localhost:${PORT}`)
);
