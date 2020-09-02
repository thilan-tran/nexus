import React, { useContext, useEffect, useRef, useState } from 'react';

import Projects from './Projects';
import Modals from './Modals';

import DeviceSpecificContext from '../context/deviceSpecificContext';
import { useResponsiveClick } from '../utils/hooks';

const About = ({ openModal, isMobile }) => {
  const aboutContentRef = useRef(null);
  const socialsRef = useRef(null);
  const githubRef = useRef(null);
  const linkedRef = useRef(null);
  const mailRef = useRef(null);

  const getContentTop = () =>
    aboutContentRef.current &&
    aboutContentRef.current.getBoundingClientRect().top;
  const [pastContent, setPastContent] = useState(
    aboutContentRef.current && getContentTop() <= 0
  );

  useEffect(() => {
    const handleScroll = () => {
      if (getContentTop() <= 0) {
        setPastContent(true);
      } else {
        setPastContent(false);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [aboutContentRef]);

  const modalClickEvents = useResponsiveClick(
    () => openModal('about'),
    isMobile,
    (evt) => socialsRef.current && !socialsRef.current.contains(evt.target)
  );

  const gitClickEvents = useResponsiveClick(
    () => githubRef.current && githubRef.current.click(),
    isMobile
  );
  const linkedClickEvents = useResponsiveClick(
    () => linkedRef.current && linkedRef.current.click(),
    isMobile
  );
  const mailClickEvents = useResponsiveClick(
    () => mailRef.current && mailRef.current.click(),
    isMobile
  );

  return (
    <div
      id="about"
      className="card"
      style={{ pointer: 'cursor' }}
      {...modalClickEvents}
    >
      <div className="header">
        <h2>ABOUT</h2>
      </div>
      <div
        className={`socials ${pastContent ? 'stick-top' : ''}`}
        ref={socialsRef}
      >
        <a
          href="https://github.com/thilan-tran"
          target="_blank"
          rel="noreferrer"
          ref={githubRef}
          {...gitClickEvents}
        >
          <svg
            className="github"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/thilan-tran/"
          target="_blank"
          rel="noreferrer"
          ref={linkedRef}
          {...linkedClickEvents}
        >
          <svg
            className="linkedin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a href="mailto:thilantran@ucla.edu" ref={mailRef} {...mailClickEvents}>
          <svg
            className="mail"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '37px'
            }}
          >
            <path d="M441.6,171.61,266.87,85.37a24.57,24.57,0,0,0-21.74,0L70.4,171.61A40,40,0,0,0,48,207.39V392c0,22.09,18.14,40,40.52,40h335c22.38,0,40.52-17.91,40.52-40V207.39A40,40,0,0,0,441.6,171.61Z" />
            <path d="M397.33,368,268.07,267.46a24,24,0,0,0-29.47,0L109.33,368" />
            <line x1="309.33" y1="295" x2="445.33" y2="192" />
            <line x1="61.33" y1="192" x2="200.33" y2="297" />
          </svg>
        </a>
      </div>
      <p ref={aboutContentRef}>
        I'm Thilan, a software engineer studying Computer Science and
        Engineering at UCLA.
        <br />
        <br />
        I've built{' '}
        <a
          className="highlight"
          href="https://github.com/thilan-tran/restock"
          target="_blank"
          rel="noreferrer"
        >
          Restock
        </a>{' '}
        , a fullstack, real-time stock trading simulator, was the frontend lead
        for a smart-scheduling Google calendar extension on the UCLA DevX{' '}
        <a
          className="highlight"
          href="https://github.com/ucladevx/twain-extension"
          target="_blank"
          rel="noreferrer"
        >
          Twain
        </a>{' '}
        project, and recently created a developer{' '}
        <a
          className="highlight"
          href="https://docs.google.com/presentation/d/1jXIn_upIi2kl6EFydXprCx9NIxDBq5iUjUILssS6lx8/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          plugin
        </a>{' '}
        for debugging React and Redux apps on the platform team at Walmart Labs.
      </p>
    </div>
  );
};

const Content = React.forwardRef(({ wrapperRef }, ref) => {
  const { scrollBarWidth, isMobile, customModalHeight } = useContext(
    DeviceSpecificContext
  );
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      if (openModal) {
        wrapper.style.top = `-${window.scrollY}px`;
        wrapper.style.position = 'fixed';
        wrapper.style.width = `calc(100% - ${scrollBarWidth}px)`;
      } else {
        const top = wrapper.style.top;
        wrapper.style.position = '';
        wrapper.style.top = '';
        wrapper.style.width = 'auto';
        window.scrollTo(0, parseInt(top || '0') * -1);
      }
    }
  }, [openModal]);

  return (
    <div className="content" ref={ref}>
      <About openModal={setOpenModal} isMobile={isMobile} />
      <Projects openModal={setOpenModal} isMobile={isMobile} />
      <Modals
        showModalId={openModal}
        resetModal={() => setOpenModal('')}
        isMobile={isMobile}
        customModalHeight={customModalHeight}
      />
    </div>
  );
});

export default Content;
