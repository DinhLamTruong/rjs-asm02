import React, { useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import SearchForm from '../../components/searchForm/SearchForm';
import ResultList from '../../components/resultList/ResultList';
import { CloseResultProvider } from '../../stores/CloseResultProvider';

const Search = () => {
  // state lưu từ khóa movie cần tìm
  const [keyword, setKeyWord] = useState('');

  // state lưu danh sách movie tìm được
  const [movieDataSearch, setMovieDataSearch] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzc5MjI2NzQ2MDU3ZGIxYzllZjFjNTcyMWI3YjdhOCIsInN1YiI6IjY0ZGJlNTE3MzcxMDk3MDExYzUxYzc3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3X3Z42i-amAWDRyHaQ-NRgOsOSuc_A-3sSeSkZj0LwE',
    },
  };

  // hàm fetch data movie với từ khóa phim cần tìm
  const getDataMovie = keyword => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then(response => response.json())
      .then(movieData => setMovieDataSearch(movieData.results))
      .catch(err => console.error(err));
  };

  //  hàm gọi hàm fetch data movie
  const searchMovieHandler = () => {
    getDataMovie(keyword);
  };

  // hàm nhận từ khóa movie cần tìm , set state với tham số keyword
  const keywordSearch = keyword => {
    setKeyWord(keyword);
  };

  // hàm reset state chứa từ khóa phim cần tìm => ''
  const resetInput = () => {
    setKeyWord('');
  };

  return (
    <div className="app">
      <NavBar />
      <CloseResultProvider>
        <SearchForm
          onGetDataMovie={searchMovieHandler}
          onGetKeyword={keywordSearch}
          onResetInput={resetInput}
        />
        <ResultList movieDataSearch={movieDataSearch} />
      </CloseResultProvider>
    </div>
  );
};

export default Search;
