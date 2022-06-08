const { select } = require("../db/connection");
const knex = require("../db/connection");

const reduceProperties = require("../utils/reduce-properties");
const reduceCriticCategory = reduceProperties("review_id", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"],
});


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

function reviewAndCriticsOfMovie(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ "r.movie_id": movieId })
        .then(reduceCriticCategory);
}

module.exports = { 
    list, 
    moviesShowing,
    read,
    reviewAndCriticsOfMovie,
    theatersPlayingMovie,
}