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

function readReviewsAndCritics(movieId) {
    return knex("movies as m")
        .join("reviews as r", "m.movie_id", "r.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ "m.movie_id": movieId });
}


module.exports = { 
    list, 
    moviesShowing,
    read,
    readReviewsAndCritics,
    theatersPlayingMovie,
}