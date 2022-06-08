const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:movieId/reviews").get(controller.reviewsByMovie).all(methodNotAllowed);

router.route("/:movieId/theaters").get(controller.theatersWithMovie).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);
// Fix movieIsShowing //
router.route("/").get(controller.list).get(controller.movieIsShowing).all(methodNotAllowed);


module.exports = router;