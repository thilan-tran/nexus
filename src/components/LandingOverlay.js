import React, { useEffect, useState, useRef, useContext } from 'react';

import WithFade from './Fade';
import { Options } from './Showcase';

import ShowcaseContext from '../context/showcaseContext';
import DeviceSpecificContext from '../context/showcaseContext';
import { useResponsiveClick } from '../utils/hooks';

const NameCard = ({ name }) => (
  <a className="name-card" href="https://thilantran.com">
    {name}
  </a>
);

const ActionButton = ({ onClick, getPrompt }) => (
  <div className="center-both">
    <h1
      className="action-button"
      style={{ width: '220px' }}
      tabIndex="0"
      onClick={(evt) => {
        onClick(evt);
        evt.target.blur();
      }}
    >
      {getPrompt()}
    </h1>
  </div>
);

const Caret = ({ onClick, caretOpts, isMobile }) => {
  console.log(isMobile);
  const clickEvents = useResponsiveClick(onClick, true);
  return (
    <div
      className={`caret ${caretOpts.up ? 'point-up' : ''} ${
        !caretOpts.visible ? 'hide' : ''
      }`}
      {...clickEvents}
    >
      <div className="caret-rotate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z"
            fill="#000"
            stroke="#000"
            strokeWidth="25"
          />
        </svg>
      </div>
    </div>
  );
};

const Toolbar = ({ hide, reset, next, Options }) => {
  const [swapped, setSwapped] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClick = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        setDropOpen(false);
      }
    };
    const handleTouch = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('touchend', handleTouch);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchend', handleTouch);
    };
  }, []);

  return (
    <div className="toolbar">
      <div
        className={`icon swap ${hide ? 'hide' : ''}`}
        onClick={() => {
          reset();
          next();
          setSwapped(!swapped);
        }}
      >
        <svg
          className={`shuffle ${swapped ? 'flip' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeLinecap: 'square',
            strokeMiterlimit: 10,
            strokeWidth: '32px'
          }}
        >
          <polyline points="400 304 448 352 400 400" />
          <polyline points="400 112 448 160 400 208" />
          <polyline points="64 352 192 352 252 260" />
          <polyline points="64 160 192 160 320 352 416 352" />
          <polyline points="416 160 320 160 288 208" />
        </svg>
      </div>
      <div
        className={`icon dropdown ${hide ? 'hide' : ''} ${
          dropOpen ? 'expand' : ''
        }`}
        ref={ref}
        onClick={(evt) =>
          contentRef.current &&
          !contentRef.current.contains(evt.target) &&
          setDropOpen(!dropOpen)
        }
      >
        <svg
          className="cog"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: '32px'
          }}
        >
          <path d="M436.67,184.11a27.17,27.17,0,0,1-38.3,0l-22.48-22.49a27.15,27.15,0,0,1,0-38.29l50.89-50.89a.85.85,0,0,0-.26-1.38C393.68,57,351.09,64.15,324.05,91c-25.88,25.69-27.35,64.27-17.87,98a27,27,0,0,1-7.67,27.14l-173,160.76a40.76,40.76,0,1,0,57.57,57.54l162.15-173.3A27,27,0,0,1,372,253.44c33.46,8.94,71.49,7.26,97.07-17.94,27.49-27.08,33.42-74.94,20.1-102.33a.85.85,0,0,0-1.36-.22Z" />
          <path
            d="M224,284c-17.48-17-25.49-24.91-31-30.29a18.24,18.24,0,0,1-3.33-21.35,20.76,20.76,0,0,1,3.5-4.62l15.68-15.29a18.66,18.66,0,0,1,5.63-3.87,18.11,18.11,0,0,1,20,3.62c5.45,5.29,15.43,15,33.41,32.52"
            style={{ strokeLinejoin: 'round' }}
          />
          <path
            d="M317.07,291.3c40.95,38.1,90.62,83.27,110,99.41a13.46,13.46,0,0,1,.94,19.92L394.63,444a14,14,0,0,1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
            style={{ strokeLinejoin: 'round' }}
          />
          <path
            d="M17.34,193.5l29.41-28.74a4.71,4.71,0,0,1,3.41-1.35,4.85,4.85,0,0,1,3.41,1.35h0a9.86,9.86,0,0,0,8.19,2.77c3.83-.42,7.92-1.6,10.57-4.12,6-5.8-.94-17.23,4.34-24.54a207,207,0,0,1,19.78-22.6c6-5.88,29.84-28.32,69.9-44.45A107.31,107.31,0,0,1,206.67,64c22.59,0,40,10,46.26,15.67a89.54,89.54,0,0,1,10.28,11.64A78.92,78.92,0,0,0,254,88.54,68.82,68.82,0,0,0,234,87.28c-13.33,1.09-29.41,7.26-38,14-13.9,11-19.87,25.72-20.81,44.71-.68,14.12,2.72,22.1,36.1,55.49a6.6,6.6,0,0,1-.34,9.16l-18.22,18a6.88,6.88,0,0,1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85,30.85,0,0,0-18.27,3.87,11.39,11.39,0,0,0-2.64,2,14.14,14.14,0,0,0,.42,20.08l1.71,1.6a4.63,4.63,0,0,1,0,6.64L71.73,246.6A4.71,4.71,0,0,1,68.32,248a4.86,4.86,0,0,1-3.41-1.35L17.34,200.22A4.88,4.88,0,0,1,17.34,193.5Z"
            style={{ strokeLinejoin: 'round' }}
          />
        </svg>
        <div className="dropdown-content options-box" ref={contentRef}>
          <Options />
        </div>
      </div>
    </div>
  );
};

const LandingOverlay = ({ clickCaret, caretOpts }) => {
  const { showcase, switchNextShowcase } = useContext(ShowcaseContext);
  const Obj = useContext(DeviceSpecificContext);
  const { isMobile } = Obj;
  console.log('context', Obj);

  const ref = useRef(null);
  useEffect(() => {
    ref.current = showcase;
  }, [showcase]);

  const ActionButtonWrap = () => (
    <ActionButton
      onClick={(evt) => showcase.spawn(evt)}
      getPrompt={() => showcase.spawnPrompt}
    />
  );
  const ActionButtons = () => (
    <>
      <ActionButtonWrap />
      <Caret onClick={clickCaret} caretOpts={caretOpts} isMobile={false} />
    </>
  );

  let FadingButtons = WithFade(
    isMobile ? ActionButtonWrap : ActionButtons,
    2,
    1,
    () => ref.current.getActive()
  );

  return (
    <div className="landing-overlay">
      <NameCard name="THILAN TRAN" />
      {isMobile ? (
        <>
          <FadingButtons />
          <Caret onClick={clickCaret} caretOpts={caretOpts} isMobile={true} />
        </>
      ) : (
        <FadingButtons />
      )}
      <Toolbar
        hide={caretOpts.up}
        reset={() => showcase.reset()}
        next={switchNextShowcase}
        Options={Options}
      />
    </div>
  );
};

export default LandingOverlay;
