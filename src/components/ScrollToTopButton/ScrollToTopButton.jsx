import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <button onClick={scrollToTop} className="scroll-to-top-button">
      ↑
    </button>
  );
};

export default ScrollToTopButton;