const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCriticCategory = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where({ "review_id": reviewId })
      .first();
}

function addCritics(reviewId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("r.*", "c.*")
      .where({ "r.review_id": reviewId })
      .first()
      .then(addCriticCategory);
}

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ "review_id": updatedReview.review_id })
      .update(updatedReview, "*")
      .then((updatedRecords) => updatedRecords[0]);
}

function destroy(reviewId) {
    return knex("reviews").where({ "review_id": reviewId }).del();
}

module.exports = {
    addCritics,
    read,
    update,
    delete: destroy,
}