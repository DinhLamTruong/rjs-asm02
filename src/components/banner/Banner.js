import React, { useState, useEffect, useContext, useMemo } from 'react';

import NavBar from '../navbar/NavBar';
import { MovieContext } from '../../stores/MovieProvider';

import './Banner.css';

const Banner = () => {
  // state mảng movie original
  const [movieOriginal, setMovieOriginal] = useState([]);

  // url movie, hàm fetch api
  const { urls, fetchMovieOriginal } = useContext(MovieContext);

  // fetch data set state movie original
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieOriginal(dataMovie.results);
    };
    fetchMovieOriginal({ url: urls[0] }, fetchMovie);
  }, []);

  // chọn ngẫu nhiên 1 movie trong mảng movie original
  const movieBanner = useMemo(() => {
    return movieOriginal[Math.floor(Math.random() * movieOriginal.length - 1)];
  }, [movieOriginal]);
  
  return (
    <>
      <NavBar />
      {movieBanner !== undefined && (
        <div className="banner">
          <img
            className="imageBanner"
            src={`https://image.tmdb.org/t/p/original${movieBanner.backdrop_path}`}
            alt=""
          />
          <div className="contentMovie">
            <h2>{movieBanner.name}</h2>
            <button>Play</button>
            <button>My List</button>
            <div className="overview">{movieBanner.overview}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
