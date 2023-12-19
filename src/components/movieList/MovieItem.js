import React, { useState, memo } from 'react';
import MovieDetail from '../movieDetail/MovieDetail';
import './MovieItem.css';

const MovieItem = ({ movieTopic, title, isPoster }) => {
  // state lưu movie khi click vào image
  const [movieCurr, setMovieCurr] = useState([]);

  // state check show component movie detail
  const [openMovieDetail, setOpenMovieDetail] = useState(false);

  // hàm tạo image với tham số list movie và đường dẫn ảnh
  const createImg = (movies, imagePath) => {
    const renderImg = (movie, index) => {
      let url;
      let img;

      if (imagePath === 'backdrop_path') {
        url = movie.backdrop_path;
      }
      if (imagePath === 'poster_path') {
        url = movie.poster_path;
      }
      // check url ảnh của movie được chọn !== null
      // khi click vào ảnh set info movie được chọn vào state
      // set state show component movie detail
      if (url !== null) {
        img = (
          <img
            onClick={() => {
              setMovieCurr(movie);
              setOpenMovieDetail(!openMovieDetail);
              if (movie.id !== movieCurr.id) {
                setOpenMovieDetail(true);
              }
            }}
            className="image"
            key={index}
            src={`https://image.tmdb.org/t/p/w500${url}`}
            alt=""
          />
        );
        return img;
      }
    };

    // check list movie phải có phần tử để tạo image
    let movie = [];
    if (movies !== undefined) {
      movie = movies.map(renderImg);
    }
    return movie;
  };

  // kiểm tra props isPoster để tạo ảnh
  // ảnh thuộc poster hay backdrop
  let movie;
  let classImg;
  if (isPoster === true) {
    movie = createImg(movieTopic, 'poster_path');
    classImg = 'imgPoster';
  } else {
    movie = createImg(movieTopic, 'backdrop_path');
    classImg = 'image-container';
  }

  return (
    <div>
      <h4>{title}</h4>
      <div className={classImg}>{movie}</div>
      <div className="showMovieDetail">
        {openMovieDetail && <MovieDetail movieDetail={movieCurr} />}
      </div>
    </div>
  );
};

export default memo(MovieItem);
