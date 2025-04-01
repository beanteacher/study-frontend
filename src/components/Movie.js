import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({movies}) {
    return (
        <div>
            {movies.map(movie => <div key={movie.id}>
                <h2>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </h2>
                <img src={movie.medium_cover_image} alt={movie.title}/>
                <p>{movie.summary}</p>
                <ul>
                    {movie.genres.map((movieGenre) => (
                        <li key={movieGenre}>{movieGenre}</li>
                    ))}
                </ul>

            </div>)}
        </div>
    )
}

Movie.propTypes = {
    movies : PropTypes.object.isRequired
}
export default Movie;