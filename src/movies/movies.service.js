const { select } = require("../db/connection");
const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

// FIX //
function moviesShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true });
}

function read(movieId) {
    return knex("movies").select("*").where({ "movie_id": movieId }).first();
}

function theatersPlayingMovie(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*","mt.*")
        .where({"mt.movie_id": movieId })
        .andWhere({"is_showing": true });
}


module.exports = { 
    list, 
    moviesShowing,
    read,
    theatersPlayingMovie,
}