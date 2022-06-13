# WeLoveMovies-server
A backend development capstone project, working off of my studies with [Thinkful](https://www.thinkful.com/). Practice in building a complex server and accessing data through a database. 

I followed an inside-out development workflow, setting up the database first and then proceeding to create the routes, handlers, and middleware in the application tier. I created and ran migrations using Knex to set up tables, then seeded the database accordingly. `cors` is implemented for the entire application.
- Languages used include Node, Express, Knex, PostgreSQL.
- Tools used included [ElephantSQL](https://www.elephantsql.com/) for the database instance, [DBeaver](https://dbeaver.io/) for the database user interface, and [Postman](https://www.postman.com/) for HTTP request testing. I also used [pino-http](https://www.npmjs.com/package/pino-http) to implement logging and trace errors throughout my development process.

Click [here](https://welovemovies-backend-mj.herokuapp.com/movies) to view the deployed application as JSON :)

---

## Routes
*All data is returned as JSON*
### Movies:
- `GET /movies` : returns a list of all movies
- `GET /movies/:movieId` : returns a movie, given its ID
- `GET /movies/:movieId/theaters` : returns all theaters where the given movie is currently playing
- `GET /movies/:movieId/reviews` : returns all reviews for a given movie, including critic details
- `GET /movies?is_showing=true`: returns a list of movies currently showing in theaters only

### Theaters:
- `GET /theaters` : returns a list of all theaters, including the movies playing at each theater

### Reviews:
- `PUT /reviews/:reviewId` : allows a given review's "content" property to be updated. Returns the updated review including its critic information
- `DELETE /reviews/:reviewId` : deletes a review by ID. Server responds with status `204 No Content`

The server responds to any request made with an incorrect ID with a `404` status code and error message.

Any request made to an existing route with an incorrect HTTP request is returned a `405` status code.

---

## ERD
Below is an entity relationship diagram depicting the structure of the database and its tables. Each table also includes timestamps.

![ERD](src/utils/WeLoveMovies%20ERD.png "WeLoveMoviesERD")
