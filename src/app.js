if (process.env.USER) require("dotenv").config();
const express = require("express");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Routers //
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// Logger //
const logger = require("./config/logger");

const app = express();
app.use(logger);
app.use(express.json());

// Routes //
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Error handlers //
app.use(notFound);
app.use(errorHandler);


module.exports = app;
