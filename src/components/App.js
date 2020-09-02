import React, { useRef, useState, useEffect } from 'react';

import '../styles/main.scss';
import Showcase from './Showcase';
import LandingOverlay from './LandingOverlay';
import Content from './Content';

import ShowcaseContext from '../context/showcaseContext';
import DeviceSpecificContext from '../context/deviceSpecificContext';

import GoL from '../js/life';
import Automata from '../js/automata';
import Particles from '../js/particles';
import {
  getScrollBarWidth,
  getIos,
  getMobileView,
  getTouchSupported
} from '../utils/utils';

const App = () => {
  const [vertBreakpoints, setVertBreakpoints] = useState([0, 0]);
  const [scrollBarWidth, setScrollBarWidth] = useState(17);
  const [isIos, setIos] = useState(false);
  const [isTouchDevice, setTouchDevice] = useState(false);
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    setMobileView(getMobileView());
    setTouchDevice(getTouchSupported());
    setVertBreakpoints([
      window.innerHeight / 5,
      window.innerHeight / 2,
      window.innerHeight * 0.9
    ]);
    setScrollBarWidth(getScrollBarWidth());
    setIos(getIos());
  }, []);

  const showcases = [GoL, Automata, Particles];
  const showcaseInitOptions = [isMobileView ? 8 : 10, null, null];

  const wrapperRef = useRef(null);
  const showcaseRef = React.createRef();
  const contentRef = React.createRef();

  const contentAbove = () =>
    contentRef.current &&
    contentRef.current.getBoundingClientRect().top < vertBreakpoints[1];

  const [caretUp, setCaretUp] = useState(contentAbove());
  const [caretVis, setCaretVis] = useState(true);

  const [showcaseIdx, setShowcaseIdx] = useState(0);

  useEffect(() => {
    const handleMove = (evt) => {
      if (caretUp && evt.screenY > vertBreakpoints[0]) {
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
    <ShowcaseContext.Provider
      value={{
        showcase: showcases[showcaseIdx],
        initOption: showcaseInitOptions[showcaseIdx],
        switchNextShowcase: () =>
          setShowcaseIdx((showcaseIdx + 1) % showcases.length)
      }}
    >
      <DeviceSpecificContext.Provider
        value={{
          isMobileView,
          isTouchDevice,
          scrollBarWidth,
          customModalHeight: isMobileView ? vertBreakpoints[2] : false
        }}
      >
        <div ref={wrapperRef} className={isIos ? 'ios-font-spacing' : ''}>
          <div ref={showcaseRef}>
            <Showcase />
          </div>
          <LandingOverlay
            clickCaret={handleClick}
            caretOpts={{ up: caretUp, visible: caretVis }}
          />
          <Content ref={contentRef} wrapperRef={wrapperRef} />
        </div>
      </DeviceSpecificContext.Provider>
    </ShowcaseContext.Provider>
  );
};

export default App;
