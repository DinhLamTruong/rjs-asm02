import React, { useState, useContext, useEffect } from 'react';
import MovieItem from './MovieItem';
import { MovieContext } from '../../stores/MovieProvider';

import './MovieList.css';

const MovieList = () => {
  // state lưu movie theo chủ đề
  const [movieOriginal, setMovieOriginal] = useState([]);
  const [movieTrend, setMovieTrend] = useState([]);
  const [movieTopRated, setMovieTopRated] = useState([]);
  const [movieAction, setMovieAction] = useState([]);
  const [movieComedy, setMovieComedy] = useState([]);
  const [movieHorror, setMovieHorror] = useState([]);
  const [movieRomance, setMovieRomance] = useState([]);
  const [movieDocumentaries, setMovieDocumentaries] = useState([]);

  const {
    urls,
    fetchMovieOriginal,
    fetchMovieTrend,
    fetchMovieTopRated,
    fetchMovieAction,
    fetchMovieComedy,
    fetchMovieHorror,
    fetchMovieRomance,
    fetchMovieDocumentaries,
  } = useContext(MovieContext);

  // fetch data movie theo từng chủ đề

  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieOriginal(dataMovie.results);
    };
    fetchMovieOriginal({ url: urls[0] }, fetchMovie);
  }, [fetchMovieOriginal, urls]);

  // Xu hướng
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieTrend(dataMovie.results);
    };
    fetchMovieTrend({ url: urls[1] }, fetchMovie);
  }, [fetchMovieTrend, urls]);

  // Xếp hạng cao
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieTopRated(dataMovie.results);
    };
    fetchMovieTopRated({ url: urls[2] }, fetchMovie);
  }, [fetchMovieTopRated, urls]);

  // Hành động
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieAction(dataMovie.results);
    };
    fetchMovieAction({ url: urls[3] }, fetchMovie);
  }, [fetchMovieAction, urls]);

  // Hài
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieComedy(dataMovie.results);
    };
    fetchMovieComedy({ url: urls[4] }, fetchMovie);
  }, [fetchMovieComedy, urls]);

  // Kinh dị
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieHorror(dataMovie.results);
    };
    fetchMovieHorror({ url: urls[5] }, fetchMovie);
  }, [fetchMovieHorror, urls]);

  // Lãng mạn
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieRomance(dataMovie.results);
    };
    fetchMovieRomance({ url: urls[6] }, fetchMovie);
  }, [fetchMovieRomance, urls]);

  // Tài liệu
  useEffect(() => {
    const fetchMovie = dataMovie => {
      setMovieDocumentaries(dataMovie.results);
    };
    fetchMovieDocumentaries({ url: urls[7] }, fetchMovie);
  }, [fetchMovieDocumentaries, urls]);

  return (
    <div className="movieList">
      <MovieItem movieTopic={movieOriginal} isPoster={true} />
      <MovieItem movieTopic={movieTrend} title="Xu hướng" />
      <MovieItem movieTopic={movieTopRated} title="Xếp hạng cao" />
      <MovieItem movieTopic={movieAction} title="Hành động" />
      <MovieItem movieTopic={movieComedy} title="Hài" />
      <MovieItem movieTopic={movieHorror} title="Kinh dị" />
      <MovieItem movieTopic={movieRomance} title="Lãng mạn" />
      <MovieItem movieTopic={movieDocumentaries} title="Tài liệu" />
    </div>
  );
};

export default MovieList;
