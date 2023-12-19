import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const homePage = useNavigate();
  const searchPage = useNavigate();

  // hàm bắt event cuộn > 100px set background nav màu đen
  //  event < 100 px màu trong suốt
  const handleScroll = () => {
    if (window.scrollY > 100) {
      const element = document.getElementById('nav');
      element.classList.add('black');
    } else if (window.scrollY < 100) {
      const element = document.getElementById('nav');
      element.classList.remove('black');
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };
  window.addEventListener('scroll', handleScroll);

  // hàm chuyển về trang chủ với path "/"
  const logoHandler = () => {
    homePage('/');
  };

  // hàm chuyển về trang tìm kiếm với path "/search"
  const handleSearch = () => {
    searchPage('/search');
  };

  return (
    <div id="nav" className="nav">
      <div className="navItems">
        <div className="logo" onClick={logoHandler}>
          Movie App
        </div>
        <svg
          className="svg-inline--fa fa-search fa-w-16 btnSearch"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          viewBox="0 0 512 512"
          onClick={handleSearch}
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>
    </div>
  );
};

export default memo(NavBar);
