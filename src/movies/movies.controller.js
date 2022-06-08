const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}
// FIX //
async function movieIsShowing(req, res, next) {
    const isShowing = (req.query.is_showing === 'true');
    if (isShowing) {
        const data = await service.moviesShowing();
        res.json({ data });
    }
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: "Movie cannot be found."});
}

function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}

async function theatersWithMovie(req, res) {
    const movieId = res.locals.movie.movie_id;
    const data = await service.theatersPlayingMovie(movieId);
    res.json({ data });
}

async function reviewsByMovie(req, res) {
    const movieId = res.locals.movie.movie_id;
    const data = await service.reviewAndCriticsOfMovie(movieId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    movieIsShowing: asyncErrorBoundary(movieIsShowing),
    read: [asyncErrorBoundary(movieExists), read],
    reviewsByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviewsByMovie)],
    theatersWithMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersWithMovie)],
}