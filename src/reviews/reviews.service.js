const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where({ "review_id": reviewId })
      .first();
}

function update(updatedReview) {
    return knex("reviews");
      
}

function destroy(reviewId) {
    return knex("reviews").where({ "review_id": reviewId }).del();
}

module.exports = {
    read,
    update,
    delete: destroy,
}