const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
// TODO: implement the below route //
router.route("/:movieId/reviews").all(methodNotAllowed);

router.route("/:movieId/theaters").get(controller.theatersWithMovie).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).get(controller.movieIsShowing).all(methodNotAllowed);

module.exports = router;