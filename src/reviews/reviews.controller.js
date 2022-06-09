const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const VALID_PROPERTIES = ["score", "content"];
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

function hasProperties(...properties) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      try {
        properties.forEach((property) => {
          if(!data[property]) {
            const error = new Error(`A ${property} is required.`)
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

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found."});
}


async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}

async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}


module.exports = {
    update: [
      asyncErrorBoundary(reviewExists), 
    //   hasOnlyValidProperties, 
    //   hasProperties("score", "content"),
      asyncErrorBoundary(update)
    ],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}