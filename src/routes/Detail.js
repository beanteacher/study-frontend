import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${params.id}`)
        ).json();
        console.log(json.data.movie);
        setMovie(json.data.movie);
        setLoading(false);
    };

    useEffect(() => {
        getMovie();

    }, []);

    return (
        <div> {loading ? <h1>Loading ...</h1> :
            <div>
                <h2>{movie.title}</h2>
                <img src={movie.medium_cover_image} alt={movie.title}/>
                <p>{movie.summary}</p>
                <ul>
                    {movie.genres.map((movieGenre) => (
                        <li key={movieGenre}>{movieGenre}</li>
                    ))}
                </ul>
            </div>
        }</div>
    )
}

export default Detail;