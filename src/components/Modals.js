import React, { useRef } from 'react';
import Img from 'gatsby-image';

import projectData from '../data/projects.json';
import ResponsiveLink from './ResponsiveLink';
import { useResponsiveClick } from '../utils/hooks';

const AboutModal = ({ image }) => {
  return (
    <>
      <div className="modal-top">
        <Img
          fluid={image}
          style={{
            width: '100%'
          }}
          imgStyle={{ objectFit: 'cover' }}
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
            <ResponsiveLink url="https://github.com/thilan-tran/dotfiles">
              dot files
            </ResponsiveLink>{' '}
            and{' '}
            <ResponsiveLink url="https://github.com/thilan-tran/wiki">
              collection of notes
            </ResponsiveLink>
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

const WmlModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="Terreform forest environment"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>WALMART LABS</b>DEV ASSISTANT
        </h2>
        <p>
          While interning at Walmart Labs, I created a plugin to increase
          engineering productivity by addressing common Walmart Labs development
          hurdles and facilitating the debugging of React and Redux apps. The
          plugin handles environment specific settings, intercepts and displays
          analytics, and records Redux store state and dispatched actions in an
          informative, <em>replayable</em> log. In addition, the extension can
          spoof Redux actions and force set Redux state, without using Redux
          DevTools or requiring source code changes. I made distribution a
          priority, and allowed for easy installation and auto-updating by using
          Bash scripts and Cron jobs.
          <br />
          <br />
          The UI is built in React, and I used browser extension architecture
          such as content and background scripts extensively in my
          implementation, for example to achieve per-tab environment
          configuration. I also utilized React internals such as React Fiber
          nodes to <em>"hack"</em> into the Redux store externally and
          dynamically dispatch custom actions or overwrite Redux state.
          <br />
          <br />
          Other smaller projects I worked on included revamping an analytics app
          using D3.js in order to organize Splunk logs into an interactive
          timeline that shows nested events, and working on open-sourcing a
          Walmart library used for dynamic prefetching.
          <br />
          <br />
          Towards the end of my internship, I gave a tech talk with these{' '}
          <ResponsiveLink url="https://docs.google.com/presentation/d/1jXIn_upIi2kl6EFydXprCx9NIxDBq5iUjUILssS6lx8/edit?usp=sharing">
            slides
          </ResponsiveLink>{' '}
          to demo the plugin and present my development approach.
        </p>
      </div>
    </div>
  </>
);

const TwainModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="Terreform forest environment"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>UCLA DEVX</b>TWAIN
        </h2>
        <p>
          The{' '}
          <ResponsiveLink url="https://github.com/ucladevx/twain-extension">
            Twain project
          </ResponsiveLink>{' '}
          is a browser extension for Google calendar that will automatically
          schedule tasks in available calendar slots. Users create and schedule
          tasks, and can reschedule or force-schedule tasks during the UX flow.
          The extension is available on the Chrome{' '}
          <ResponsiveLink url="https://chrome.google.com/webstore/detail/twain/cmljiidokkhmheonmpfciinfdonkimop?hl=en">
            store
          </ResponsiveLink>
          .
          <br />
          <br />
          As the frontend lead, I created and organized the overall structure of
          the frontend application in React as a sidebar in an iframe, and
          open-sourced reusable, complex UI components such as time and date
          pickers that were implemented <em>without</em> using UI libraries. I
          also worked on refining the backtracking algorithm used in the Node.js
          backend to place optimal tasks in free calendar slots.
        </p>
      </div>
    </div>
  </>
);

const TerreformModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="Terreform forest environment"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
          <b>UCLA CREATIVE LABS</b>TERREFORM
        </h2>
        <p>
          <ResponsiveLink url="https://github.com/angle-zhang/terreform">
            Terreform
          </ResponsiveLink>{' '}
          is a donation website for non-profits fighting climate change
          featuring interactive 3D environments rendered using three.js that
          evolve as users donate. See the{' '}
          <ResponsiveLink url="http://terreform.herokuapp.com/home">
            site
          </ResponsiveLink>{' '}
          live.
          <br />
          <br />
          My responsibility as the frontend developer was to integrate together
          browser events, dynamic React component rendering, and the three.js
          container into dynamic, animated biomes where each donation
          corresponds with an interactive object in the environment.
        </p>
      </div>
    </div>
  </>
);

const RestockModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="Restock stock view UI"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>RESTOCK</h2>
        <p>
          As a fullstack side project, I built the{' '}
          <ResponsiveLink url="https://github.com/thilan-tran/restock">
            Restock
          </ResponsiveLink>{' '}
          webapp, a real-time stock trading simulator. Users can can simulate
          transactions, track stocks for real-time updates, and view stock
          history in a dashboard or other user portfolios on a leaderboard. All
          user actions are authenticated, and websockets allow for instant
          updates from the backend to any connected clients. Check out the live{' '}
          <ResponsiveLink url="https://restock-app.herokuapp.com/">
            website
          </ResponsiveLink>
          .
          <br />
          <br />
          The backend was implemented with Flask, SQLAlchemy, and websockets and
          the frontend utilizes React as well as Recharts as a graphing utility.
        </p>
      </div>
    </div>
  </>
);

const WeatherModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="Simple weather hover UI"
      />
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
          <ResponsiveLink url="https://github.com/thilan-tran/simple-weather">
            Simple Weather
          </ResponsiveLink>{' '}
          was born, the same simple but clean weather forecast UI recreated
          using multiple frameworks including native JavaScript, jQuery, and
          React.
        </p>
      </div>
    </div>
  </>
);

const modalComponents = {
  about: AboutModal,
  wml: WmlModal,
  twain: TwainModal,
  terreform: TerreformModal,
  restock: RestockModal,
  weather: WeatherModal
};

const Modals = ({
  showModalId,
  resetModal,
  isTouchDevice,
  customModalHeight,
  images
}) => {
  const modalArr = projectData.map((proj) => {
    const ModalComp = modalComponents[proj.id];
    return {
      ...proj,
      body: <ModalComp image={images[proj.image].childImageSharp.fluid} />
    };
  });

  const ref = useRef(null);

  const currModal = modalArr.find(({ id }) => id === showModalId);

  const prefetchImages = Object.values(images).map((gatsbySharp) => (
    <link
      rel="prefetch"
      href={gatsbySharp.childImageSharp.fluid.src}
      key={gatsbySharp.childImageSharp.fluid.src}
    />
  ));

  const modalMarginClickEvents = useResponsiveClick(
    (evt) => ref.current && !ref.current.contains(evt.target) && resetModal(),
    isTouchDevice
  );
  const closeClickEvents = useResponsiveClick(
    () => resetModal(),
    isTouchDevice
  );
  const overlayClickEvents = useResponsiveClick(
    () => resetModal(),
    isTouchDevice
  );

  return (
    <>
      <div>{prefetchImages}</div>
      <div
        className={`modal ${currModal ? 'show' : ''}`}
        style={{ height: customModalHeight && `${customModalHeight}px` }}
        {...modalMarginClickEvents}
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
              strokeWidth: '32px'
            }}
            {...closeClickEvents}
          >
            <line x1="368" y1="368" x2="144" y2="144" />
            <line x1="368" y1="144" x2="144" y2="368" />
          </svg>
          {currModal && currModal.body}
        </div>
      </div>
      <div
        className={`overlay ${currModal ? 'show' : ''}`}
        {...overlayClickEvents}
      />
    </>
  );
};

export default Modals;
