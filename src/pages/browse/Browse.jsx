import React from 'react';
import Banner from '../../components/banner/Banner';
import MovieList from '../../components/movieList/MovieList';

function Browse() {
  return (
    <div className="app">
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
