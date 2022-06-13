const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Check if request body contains data //
function hasData(req, res, next) {
    if (req.body.data) {
        return next();
    }
    next({status: 400, message: "body must have data property"});
}

const VALID_PROPERTIES = [
    "review_id",
    "content",
    "score",
    "critic_id",
    "movie_id"
];

// Check that request body contains valid properties only //
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// Check that request body contains required properties //
function hasProperties(...properties) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      try {
        properties.forEach((property) => {
          if(!data[property]) {
            const error = new Error(`A ${property} property is required.`)
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch(error) {
          next(error);
      }
    };
}

// Check if given review exists //
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found."});
}

// Update review stored in locals with data in request body //
async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };

    await service.update(updatedReview);
    // Attach 'critic' key with info for the updated review's critic //
    const addedCritics = await service.addCritics(res.locals.review.review_id);
    res.json({ data: addedCritics });
}

// Delete review stored in locals //
async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}


module.exports = {
    update: [
      asyncErrorBoundary(reviewExists), 
      hasData,
      hasOnlyValidProperties, 
      hasProperties("content"),
      asyncErrorBoundary(update)
    ],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}