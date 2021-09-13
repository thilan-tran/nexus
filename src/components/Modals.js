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
            customization. Check out my{' '}
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
            In my free time I enjoy playing online MOBAs with friends,
            grinding indie roguelikes or metroidvanias, and
            listening to different music genres running the gamut from classic rock
            and indie pop to rap and contemporary jazz.
          </p>
        </div>
      </div>
    </>
  );
};

const FbModal = ({ image }) => (
  <>
    <div className="modal-top">
      <Img
        fluid={image}
        style={{
          height: '90%',
          width: '95%'
        }}
        imgStyle={{ objectFit: 'contain' }}
        alt="ML diagram"
      />
    </div>
    <div className="modal-description">
      <div>
        <h2>
            <b>FACEBOOK</b>AI/ML DEVX
        </h2>
        <p>
            At Facebook, I interned as a frontend engineering intern on the
            AI and ML Developer Experience team, specifically as a part of the
            concurrent model development pod. Overall, I received a
            Greatly Exceeds (GE) expectations performance rating for my work
            during that summer.
            <br />
            <br />
            My first project was to build a dashboard in React for ML model
            change proposers to use during the development funneling process.
            This tool acted as a centralized landing page where the ML engineers
            could easily navigate and explore the status of proposals.
            I wrote GraphQL queries, implemented GraphQL fields, and connected
            database schemas with an internal searching framework.
            <br />
            <br />
            Then, I had the opportunity to collaborate with engineers across
            multiple teams in order to define an entirely new notion of the proposal
            lifecycle and the stages of that lifecycle.
            This effort required dedicated brainstorming and full comprehension
            of the intricate issues behind concurerent model development, especially
            in comparison to traditional software CI/CD. I then built a visualizer
            for this proposal lifecycle in React that illustrated these complexities
            to users, complete with expressive hover cards that surfaced
            stage-relevant information and statistics.
            <br />
            <br />
            I also had the opportunity to promote better engineering by writing several
            React utilities to reduce code duplication accross the broader ML DevX team.
            One of these was a shared table component written in Flow (TypeScript)
            that utilized type parameterization where each column was defined
            in terms of its data dependencies in a GraphQL fragment.
            This approach allowed for flexible and extensible columns, while
            avoiding unecessary queries through dynamic data fetching.
        </p>
      </div>
    </div>
  </>
);

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
        alt="Dev Assistant timeline UI"
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
          DevTools or requiring source code changes. I also made distribution a
          priority, and allowed for easy installation and auto-updating using
          Bash scripts and Cron jobs.
          <br />
          <br />
          The UI is built in React, and I used browser extension architecture
          like content and background scripts extensively in my implementation,
          for example to achieve per-tab environment configurations. I utilized
          React internals such as React Fiber nodes in order to <em>
            "hack"
          </em>{' '}
          into the Redux store externally to dynamically dispatch custom actions
          and overwrite Redux state.
          <br />
          <br />
          Other projects I worked on included revamping an analytics app using
          D3.js in order to organize Splunk logs into an interactive timeline
          that shows nested events, and working on open-sourcing a Walmart
          library used for dynamic asset prefetching.
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
        alt="Twain scheduling UI"
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
          the frontend application in React, and implemented a UX-driven design
          for seamless switching between creating, scheduling, and making
          changes to tasks in the middle of scheduling. I also{' '}
          <ResponsiveLink url="https://github.com/thilan-tran/quicksilver">
            open-sourced
          </ResponsiveLink>{' '}
          the reusable, complex UI components such as time and date pickers that
          I had implemented <em>without</em> using UI libraries. On the backend
          side, I worked on refining the backtracking algorithm used in the
          Node.js backend to place optimal tasks in free calendar slots.
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
          <br />I designed and implemented the UI to showcase graphical
          analytics of stocks and user portfolios, and also optimized server
          performance using a hierarchical schema that reduced database loads
          and socket updates. The backend was implemented with Flask,
          SQLAlchemy, and websockets and the frontend utilizes React as well as
          Recharts as a graphing utility.
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
  fb: FbModal,
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
