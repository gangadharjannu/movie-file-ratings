const fs = require('fs');
const path = require('path');

const axios = require('axios');
const ptn = require('parse-torrent-name');

const {
    OMDB_API_KEY,
    TMDB_API_KEY
} = require('./creds');

const movieDirPath = path.join(process.cwd(), 'movies');

const OMDB_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&s=`;
const TMDB_URL = `http://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;

// axios.interceptors.response.use(config => {
//     console.log(config);
//     return config.data
// });
const generateDOM = (movies) => {
    return movies.map(movie => {
        return `<div>Filename:</div><div>${movie.fileName}</div>
        <div>Movie:</div><div>${movie.imdbInfo.title||movie.movieName||''}</div>
        <div>Rating:</div><div>${movie.imdbInfo.vote_average||''}</div>
        <div>Year:</div><div>${movie.imdbInfo.release_date||''}</div>
        `;
        console.log(`title:\t${a.title}\nyear:\t${a.release_date}\nrating:\t${a.vote_average}`)
    }).join('');
};

const showFileMovieRatings = (directoryPath, selector) => {
    debugger;
    fs.readdir(directoryPath, (err, contents) => {
        const movieNames = contents
            .map(item => ptn(item).title);

        const movieNames$ = movieNames.map(movie => axios.get(`${TMDB_URL}${movie}`));


        axios.all(movieNames$)
            .then(axios.spread(function (...args) {
                const movieFileRatings = contents.map((item, idx) => {
                    return {
                        fileName: item,
                        movieName: ptn(item).title,
                        imdbInfo: (args[idx].status === 200 && args[idx].data.total_results > 0) ? args[idx].data.results[0] : {}
                    }
                });
                console.log(generateDOM(movieFileRatings));
                debugger;
                document.getElementById(selector).innerHTML = generateDOM(movieFileRatings);
            }))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    });
};

module.exports = {
    show:showFileMovieRatings
};