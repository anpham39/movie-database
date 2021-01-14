import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
const placeholderUrl =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    if (data.Response == "False") {
      setError({ show: true, msg: data.Error });
    } else {
      await setMovie(data);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Back to movies list
        </Link>
      </div>
    );
  }

  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Actors: actors,
    Genre: genre,
    Runtime: duration,
    Released: released,
    imdbRating: rating,
    imdbVotes: vote,
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster == "N/A" ? placeholderUrl : poster} alt="title" />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>Released: {released}</p>
        <p>Actors: {actors}</p>
        <p>Genre: {genre}</p>
        <p>Duration: {duration}</p>
        <p>Plot: {plot}</p>
        {rating != "N/A" && (
          <h4>
            IMDb rating: {rating} {vote != "N/A" && <span>({vote} votes)</span>}
          </h4>
        )}
        <Link to="/" className="btn">
          Back to movies list
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
