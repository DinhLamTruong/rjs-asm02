import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './MovieDetail.css';

const MovieDetail = ({ movieDetail }) => {
  // state lưu key movie truyền vào component Video
  const [movieInfo, setMovieInfo] = useState();

  // 2 state check khi có video thì hiển thị ẩn image
  // không có video thì hiển thị ảnh backdrop
  const [backdropImg, setBackdropImg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzc5MjI2NzQ2MDU3ZGIxYzllZjFjNTcyMWI3YjdhOCIsInN1YiI6IjY0ZGJlNTE3MzcxMDk3MDExYzUxYzc3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3X3Z42i-amAWDRyHaQ-NRgOsOSuc_A-3sSeSkZj0LwE',
    },
  };
  const uri = `https://api.themoviedb.org/3/movie/${movieDetail.id}/videos?api_key=9c79226746057db1c9ef1c5721b7b7a8`;

  // fetch data với tham số id truyền vào uri
  useEffect(() => {
    fetch(uri, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Video information not found!');
        }
        return response.json();
      })
      .then(movie => {
        // lọc video thỏa điều kiện type = "Teaser" hoặc "Trailer" (Ưu tiên "Trailer")
        const movieVideo = movie.results.find(
          movieId =>
            (movieId.site === 'YouTube' && movieId.type === 'Trailer') ||
            movieId.type === 'Teaser'
        );
        // có video thỏa điều kiện type = "Teaser" hoặc "Trailer" (Ưu tiên "Trailer")
        // set state với key tìm được
        // show video, ẩn ảnh backdrop
        // Ngược lại show ảnh ẩn video
        if (typeof movieVideo !== 'undefined') {
          setMovieInfo(movieVideo.key);
          setShowVideo(true);
          setBackdropImg(false);
        } else {
          setShowVideo(false);
          setBackdropImg(true);
        }
      })
      .catch(error => {
        setBackdropImg(true);
        console.log(error);
      });
  }, [uri, options]);

  const opts = {
    width: '100%',
    height: '360',
    playerVars: {
      autoplay: 0,
    },
  };

  //  để hiển thị ảnh
  let urlImg = movieDetail.backdrop_path
    ? movieDetail.backdrop_path
    : movieDetail.poster_path;

  return (
    <div className="movieDetail">
      <div className="descriptions">
        <div className="descriptions-title">
          {movieDetail.title || movieDetail.name}
        </div>
        <div className="descriptions-date">
          Release Date: {movieDetail.release_date || movieDetail.first_air_date}
        </div>
        <div className="descriptions-vote">
          Vote: {movieDetail.vote_average} / 10
        </div>
        <div className="descriptions-overview">{movieDetail.overview}</div>
      </div>
      <div className="movieVideo">
        {showVideo && <YouTube videoId={movieInfo} opts={opts} />}
        {backdropImg && (
          <img src={`https://image.tmdb.org/t/p/w500${urlImg}`} alt="" />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
