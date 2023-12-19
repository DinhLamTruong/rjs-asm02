import React, { createContext } from 'react';
import useHttp from '../hooks/use-http';

const API_KEY = '9c79226746057db1c9ef1c5721b7b7a8';
const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
const urls = [
  `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`,
  `https://api.themoviedb.org/3${requests.fetchTrending}`,
  `https://api.themoviedb.org/3${requests.fetchTopRated}`,
  `https://api.themoviedb.org/3${requests.fetchActionMovies}`,
  `https://api.themoviedb.org/3${requests.fetchComedyMovies}`,
  `https://api.themoviedb.org/3${requests.fetchHorrorMovies}`,
  `https://api.themoviedb.org/3${requests.fetchRomanceMovies}`,
  `https://api.themoviedb.org/3${requests.fetchDocumentaries}`,
];

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  // sử dụng hook useHttp fetch api cho từng movie với url
  const { sendRequest: fetchMovieOriginal } = useHttp();
  const { sendRequest: fetchMovieTrend } = useHttp();
  const { sendRequest: fetchMovieTopRated } = useHttp();
  const { sendRequest: fetchMovieAction } = useHttp();
  const { sendRequest: fetchMovieComedy } = useHttp();
  const { sendRequest: fetchMovieHorror } = useHttp();
  const { sendRequest: fetchMovieRomance } = useHttp();
  const { sendRequest: fetchMovieDocumentaries } = useHttp();

  const movieDatas = {
    urls,
    fetchMovieOriginal,
    fetchMovieTrend,
    fetchMovieTopRated,
    fetchMovieAction,
    fetchMovieComedy,
    fetchMovieHorror,
    fetchMovieRomance,
    fetchMovieDocumentaries,
  };
  return (
    <MovieContext.Provider value={movieDatas}>{children}</MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
