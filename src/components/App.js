import React, { useRef, useState, useEffect } from 'react';

import '../styles/main.scss';
import LandingOverlay from './LandingOverlay';
import Content from './Content';
import { getScrollBarWidth, getIos } from '../utils/utils';

const VertBreakpoints = [window.innerHeight / 5, window.innerHeight / 2];
const scrollBarWidth = getScrollBarWidth();
const isIos = getIos();

const App = () => {
  const wrapperRef = useRef(null);
  const showcaseRef = React.createRef();
  const contentRef = React.createRef();

  const contentAbove = () =>
    contentRef.current &&
    contentRef.current.getBoundingClientRect().top < VertBreakpoints[1];

  const [caretUp, setCaretUp] = useState(contentAbove());
  const [caretVis, setCaretVis] = useState(true);

  useEffect(() => {
    const handleMove = (evt) => {
      if (caretUp && evt.screenY > VertBreakpoints[0]) {
        setCaretVis(false);
      } else {
        setCaretVis(true);
      }
    };
    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, [caretUp]);

  useEffect(() => {
    if (contentRef.current) {
      const handleScroll = () => {
        if (contentAbove()) {
          setCaretUp(true);
        } else {
          setCaretUp(false);
        }
      };
      document.addEventListener('scroll', handleScroll);
      return () => document.removeEventListener('scroll', handleScroll);
    }
  }, [contentRef]);

  const scrollOpts = {
    block: 'start',
    behavior: 'smooth',
    inline: 'nearest'
  };
  const handleClick = () => {
    if (!contentAbove()) {
      contentRef.current && contentRef.current.scrollIntoView(scrollOpts);
    } else {
      showcaseRef.current && showcaseRef.current.scrollIntoView(scrollOpts);
    }
  };

  return (
    <div ref={wrapperRef} className={isIos ? 'ios-font-spacing' : ''}>
      <div ref={showcaseRef} />
      <LandingOverlay
        clickCaret={handleClick}
        caretOpts={{ up: caretUp, visible: caretVis }}
      />
      <Content
        ref={contentRef}
        wrapperRef={wrapperRef}
        scrollBarWidth={scrollBarWidth}
      />
    </div>
  );
};

export default App;
