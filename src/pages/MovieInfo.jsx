import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { getMovieDetails } from "../services/api";
import "../css/MovieInfo.css";

const MovieInfo = () => {
    const { id } = useParams();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const [movie, setMovie] = useState(null);
    const favorite = isFavorite(Number(id));

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div className="loading">Loading movie details...</div>;
    }

    const onFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    // Format release date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="movie-info-page">
            <div className="movie-info-container">
                <div className="movie-left">
                    <div className="movie-poster-container">
                        <img
                            className="movie-poster"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="movie-overlay">
                            <button
                                className={`favorite-btn ${favorite ? "active" : ""}`}
                                onClick={onFavoriteClick}
                            >
                                ♥
                            </button>
                        </div>
                    </div>
                </div>
                <div className="movie-right">
                    <h1 className="movie-title">{movie.title}</h1>
                    <div className="movie-overview">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="movie-cast">
                        <h2>Top Billed Cast</h2>
                        <div className="cast-list">
                            {movie.credits?.cast.slice(0, 10).map((cast) => (
                                <div className="cast-member" key={cast.id}>
                                    <img
                                        className="cast-photo"
                                        src={
                                            cast.profile_path
                                                ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                                                : "https://via.placeholder.com/80?text=N/A" // Placeholder image
                                        }
                                        alt={cast.name}
                                    />
                                    <p>{cast.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="movie-details">
                        <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                        <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
                    </div>
                </div>
            </div>
            <div className="movie-trailers">
                <h2>Trailers</h2>
                <div className="trailers-container">
                    {movie.videos?.results
                        .filter((video) => video.type === "Trailer")
                        .map((trailer) => (
                            <iframe
                                key={trailer.id}
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="trailer-video"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
