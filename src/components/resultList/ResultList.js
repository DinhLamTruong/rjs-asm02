import React, { useState, memo, useContext, useEffect } from 'react';
import MovieDtail from '../movieDetail/MovieDetail';
import { CLoseContext } from '../../stores/CloseResultProvider';
import './ResultList.css';

const ResultList = ({ movieDataSearch }) => {
  // state lưu movie tìm kiếm được
  const [movieCurr, setMovieCurr] = useState([]);

  // state ckeck show component movie detail
  const [openMovieDetail, setOpenMovieDetail] = useState(false);

  // context set state show component deital
  const { handleCLose, openResult } = useContext(CLoseContext);

  // hàm set lại state show component
  // set state vói tham số true => false
  useEffect(() => {
    const handleCLoseDetail = isClose => {
      setOpenMovieDetail(!isClose);
    };
    handleCLose(handleCLoseDetail);
  }, [handleCLose]);

  // hàm tạo image với data movie tìm kiếm được
  // khi ảnh được click set info movie vào state
  // set state show component
  // khi click ảnh khác nhau set state => true
  const createImgList = movies => {
    return movies.map((movie, index) => {
      return (
        movie.poster_path !== null && (
          <img
            onClick={() => {
              setMovieCurr(movie);
              setOpenMovieDetail(!openMovieDetail);
              if (movie.id !== movieCurr.id) {
                setOpenMovieDetail(true);
              }
            }}
            className="imageDetail"
            key={index}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
        )
      );
    });
  };

  // tạo ảnh với hàm tạo image có data movie tìm được
  const movieResult = createImgList(movieDataSearch);

  return (
    <>
      <h4 className="searchTitle">Search Result</h4>
      <div className="searchResults">
        <div className="resultMovie">{!openResult && movieResult}</div>
        <div>{openMovieDetail && <MovieDtail movieDetail={movieCurr} />}</div>
      </div>
    </>
  );
};

export default memo(ResultList);
