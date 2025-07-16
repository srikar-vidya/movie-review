import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { API_URL } from './Context';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getMovie = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovie(`${API_URL}&i=${id}`);
    }, 800);
    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'>Loading....</div>
      </div>
    );
  }

  return (
    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img className="img-single" src={movie.Poster} alt={movie.Title} style={{borderBottomRightRadius: "15px" }}/>
        </figure>
        <div className='card-content'>
          <h2>{movie.Title}</h2>
          <h2>{movie.Released}</h2>
          <h2>{movie.Genre}</h2>
          <h2>{movie.imdbRating} ⭐</h2>
          <h2>{movie.Country}</h2>
          <NavLink to="/" className="back-btn">Go Back</NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
