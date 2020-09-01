import React, { useState, useRef, useEffect } from 'react';

import PercussionPhoto from '../static/percussion-photo.jpg';
import WmlTimeline from '../static/wml-timeline.jpeg';
import WmlState from '../static/wml-state-edit.jpeg';
import TwainDate from '../static/twain-date.jpeg';
import TwainTime from '../static/twain-time.jpeg';
import RestockStocks from '../static/restock-stockview.jpeg';
import TerreformForest from '../static/terreform-forest.jpeg';
import WeatherUI from '../static/weather-hover.jpeg';

const images = {
  PercussionPhoto,
  WmlTimeline,
  WmlState,
  TwainDate,
  TwainTime,
  RestockStocks,
  TerreformForest,
  WeatherUI
};

const AboutModal = () => {
  return (
    <>
      <div className="modal-top">
        <img
          height="80%"
          src={images.PercussionPhoto}
          alt="Performing in the UCLA percussion ensemble"
        />
      </div>
      <div className="modal-description">
        <div>
          <h2>MORE ABOUT ME</h2>
          <p>
            I play percussion in the UCLA Percussion Ensemble and Wind Ensemble.
            <br />
            <br />
            I am an avid user of Vim for everything from coding to note-taking
            and scratch, and am fascinated with shell and text editor
            customization.
            <br />
            Check out my{' '}
            <a
              className="highlight"
              href="https://github.com/thilan-tran/dotfiles"
              target="_blank"
              rel="noreferrer"
            >
              dot files
            </a>{' '}
            and{' '}
            <a
              className="highlight"
              href="https://github.com/thilan-tran/wiki"
              target="_blank"
              rel="noreferrer"
            >
              collection of notes
            </a>
            .
            <br />
            <br />
            In my free time I enjoy playing online MOBAs with friends and
            listening to different music ranging from classic rock to
            contemporary jazz.
          </p>
        </div>
      </div>
    </>
  );
};

const WmlModal = () => (
  <>
    <div className="modal-top">
      <img
        height="80%"
        src={images.WmlTimeline}
        alt="WalmartLabs Dev Assistant timeline"
      />
      <img
        height="62%"
        src={images.WmlState}
        alt="WalmartLabs Dev Assistant state change"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>WALMART LABS</b>DEV ASSISTANT
        </h2>
        <p>
          While interning at Walmart Labs, I created a plugin to address
          development hurdles and increase engineering productivity by handling
          environment specific settings, intercepting and displaying analytics,
          recording Redux store state and dispatched actions in a{' '}
          <em>replayable</em> log, as well as allowing for spoofing of actions
          and force setting of Redux state.
          <br />
          <br />
          The UI is built in React, and I used browser extension architecture
          such as content and background scripts extensively in my
          implementation. I also utilized React internals such as React Fiber
          nodes to <em>"hack"</em> into the Redux store externally and
          dynamically dispatch custom actions or overwrite Redux state without
          source code changes or the use of the existing Redux DevTools. <br />
          <br />
          Towards the end of my internship, I gave a tech talk with these{' '}
          <a
            className="highlight"
            href="https://docs.google.com/presentation/d/1jXIn_upIi2kl6EFydXprCx9NIxDBq5iUjUILssS6lx8/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            slides
          </a>{' '}
          to demo the plugin and present my development approach.
        </p>
      </div>
    </div>
  </>
);

const TwainModal = () => (
  <>
    <div className="modal-top">
      <img height="80%" src={images.TwainDate} alt="Twain date picker UI" />
      <img height="80%" src={images.TwainTime} alt="Twain time picker UI" />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>UCLA DEVX</b>TWAIN
        </h2>
        <p>
          The{' '}
          <a
            className="highlight"
            href="https://github.com/ucladevx/twain-extension"
            target="_blank"
            rel="noreferrer"
          >
            Twain project
          </a>{' '}
          is a browser extension for Google calendar that will automatically
          schedule tasks in available calendar slots. Users create and schedule
          tasks, and can reschedule or force-schedule tasks during the UX flow.
          The extension is available on the Chrome{' '}
          <a
            className="highlight"
            href="https://chrome.google.com/webstore/detail/twain/cmljiidokkhmheonmpfciinfdonkimop?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            store
          </a>
          .
          <br />
          <br />
          As the frontend lead, I created the backbone structure of the client
          facing app and implemented reusable, complex UI components such as
          time and date pickers in React entirely <em>without</em> using UI
          libraries. I also worked on the backtracking algorithm used in the
          Node.js backend to place optimal tasks in free calendar slots.
        </p>
      </div>
    </div>
  </>
);

const TerreformModal = () => (
  <>
    <div className="modal-top">
      <img
        height="80%"
        src={images.TerreformForest}
        alt="Terreform forest environment"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>UCLA CREATIVE LABS</b>TERREFORM
        </h2>
        <p>
          <a
            className="highlight"
            href="https://github.com/angle-zhang/terreform"
            target="_blank"
            rel="noreferrer"
          >
            Terreform
          </a>{' '}
          is a donation website for non-profits fighting climate change that
          features interactive environments rendered using ThreeJS that evolve
          as users donate. See the{' '}
          <a
            className="highlight"
            href="http://terreform.herokuapp.com/home"
            target="_blank"
            rel="noreferrer"
          >
            site
          </a>{' '}
          live.
          <br />
          <br />
          My responsibility as a frontend developer was to integrate together
          frontend client events, dynamic React component rendering, and the
          ThreeJS container into dynamic, animated biomes where each donation
          corresponds with an interactive object in the environment.
        </p>
      </div>
    </div>
  </>
);

const RestockModal = () => (
  <>
    <div className="modal-top">
      <img
        height="80%"
        src={images.RestockStocks}
        alt="Restock stock view UI"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>RESTOCK</h2>
        <p>
          As a fullstack side project, I built the{' '}
          <a
            className="highlight"
            href="https://github.com/thilan-tran/restock"
            target="_blank"
            rel="noreferrer"
          >
            Restock
          </a>{' '}
          webapp, a real-time stock trading simulator. Users can can simulate
          transactions, track stocks for real-time updates, and view stock
          history in a dashboard or other user portfolios on a leaderboard. All
          user actions are authenticated, and websockets allow for instant
          updates from the backend to any connected clients. Check out the live{' '}
          <a
            className="highlight"
            href="https://restock-app.herokuapp.com/"
            target="_blank"
            rel="noreferrer"
          >
            website
          </a>
          .
          <br />
          <br />
          The backend was implemented with Flask, SQLAlchemy, and websockets and
          the frontend utilizes React as well as ReCharts as a graphing utility.
        </p>
      </div>
    </div>
  </>
);

const WeatherModal = () => (
  <>
    <div className="modal-top">
      <img height="80%" src={images.WeatherUI} alt="Simple weather hover UI" />
    </div>
    <div className="modal-description">
      <div>
        <h2>SIMPLE WEATHER</h2>
        <p>
          As a self-learning exercise, I wanted to practice implementing the
          same application using different frontend frameworks.
          <br />
          <br />
          Thus,{' '}
          <a
            className="highlight"
            href="https://github.com/thilan-tran/simple-weather"
            target="_blank"
            rel="noreferrer"
          >
            Simple Weather
          </a>{' '}
          was born, the same simple but clean weather forecast UI recreated
          using multiple frameworks including native JavaScript, jQuery, and
          React.
        </p>
      </div>
    </div>
  </>
);

const modalArr = [
  {
    id: 'about',
    body: <AboutModal />
  },
  {
    id: 'wml',
    body: <WmlModal />
  },
  {
    id: 'twain',
    body: <TwainModal />
  },
  {
    id: 'terreform',
    body: <TerreformModal />
  },
  {
    id: 'restock',
    body: <RestockModal />
  },
  {
    id: 'weather',
    body: <WeatherModal />
  }
];

const Modals = ({ showModalId, resetModal, isMobile }) => {
  const currModal = modalArr.find(({ id }) => id === showModalId);

  const [down, setDown] = useState(false);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    if (isMobile) {
      setHeight(window.innerHeight * 0.9);
    }
  }, [isMobile]);

  const closeRef = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    let down = false;
    const handleDown = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        down = true;
      }
    };
    const handleUp = (evt) => {
      if (down && ref.current && !ref.current.contains(evt.target)) {
        resetModal();
      }
      down = false;
    };
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);
    return () =>
      document.removeEventListener('mousedown', handleDown) &&
      document.removeEventListener('mouseup', handleUp);
  }, []);

  const prefetchImages = Object.values(images).map((url) => (
    <link rel="prefetch" href={url} key={url} />
  ));

  useEffect(() => {
    // if (closeRef.current) {
    //   closeRef.current.click();
    // const handle = () => {
    //   console.log('CLICKED');
    //   resetModal();
    // };
    // closeRef.current.addEventListener('click', handle);
    // return () => {
    //   closeRef.current.removeEventListener('click', handle);
    // };
    // }
  }, [closeRef]);

  return (
    <>
      <div>{prefetchImages}</div>
      <div
        className={`modal ${currModal ? 'show' : ''}`}
        style={{ height: height && `${height}px` }}
      >
        <div className="modal-body" ref={ref}>
          <svg
            className="close"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            viewBox="0 0 512 512"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '32px',
              cursor: 'pointer',
              padding: 0
            }}
            onTouchMove={() => setDown(null)}
            onTouchStart={() => setDown(new Date())}
            onTouchEnd={() => {
              if (down && new Date() - down < 300) {
                resetModal();
              }
              setDown(null);
            }}
            ref={closeRef}
          >
            <line x1="368" y1="368" x2="144" y2="144" />
            <line x1="368" y1="144" x2="144" y2="368" />
          </svg>
          {currModal && currModal.body}
        </div>
      </div>
      )
      <div className={`overlay ${currModal ? 'show' : ''}`} />
    </>
  );
};

export default Modals;
