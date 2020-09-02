import React from 'react';
import Img from 'gatsby-image';

import { useResponsiveClick } from '../utils/hooks';

const Projects = ({ images, openModal, isTouchDevice }) => {
  const wmlClickEvents = useResponsiveClick(
    () => openModal('wml'),
    isTouchDevice
  );
  const twainClickEvents = useResponsiveClick(
    () => openModal('twain'),
    isTouchDevice
  );
  const terreformClickEvents = useResponsiveClick(
    () => openModal('terreform'),
    isTouchDevice
  );
  const restockClickEvents = useResponsiveClick(
    () => openModal('restock'),
    isTouchDevice
  );
  const weatherClickEvents = useResponsiveClick(
    () => openModal('weather'),
    isTouchDevice
  );

  return (
    <div className="card" style={{ cursor: 'default' }}>
      <h2 id="projects">PROJECTS</h2>
      <div className="grid">
        <div
          className="grid-item"
          data-project="wml-dev-assistant"
          {...wmlClickEvents}
        >
          <div className="title">
            WALMART LABS
            <br />
            <b>DEV ASSISTANT</b>
          </div>
          <Img
            fluid={images.wmlCover.childImageSharp.fluid}
            style={{
              height: '75%',
              width: '75%'
            }}
            imgStyle={{ objectFit: 'contain' }}
            alt="WalmartLabs Dev Assistant Timeline"
          />
        </div>
        <div className="grid-item" data-project="twain" {...twainClickEvents}>
          <div className="title">
            UCLA DEVX
            <br />
            <b>TWAIN</b>
          </div>
          <Img
            fluid={images.twainCover.childImageSharp.fluid}
            style={{
              height: '75%',
              width: '75%'
            }}
            imgStyle={{ objectFit: 'contain' }}
            alt="Twain calendar UI"
          />
        </div>
        <div
          className="grid-item"
          data-project="terreform"
          {...terreformClickEvents}
        >
          <div className="title">
            UCLA CREATIVE LABS
            <br />
            <b>TERREFORM</b>
          </div>
          <Img
            fluid={images.terreformCover.childImageSharp.fluid}
            style={{
              height: '75%',
              width: '75%'
            }}
            imgStyle={{ objectFit: 'contain' }}
            alt="Terreform farm environment"
          />
        </div>
        <div
          className="grid-item"
          data-project="restock"
          {...restockClickEvents}
        >
          <div className="title">
            SIDE PROJECT
            <br />
            <b>RESTOCK</b>
          </div>
          <Img
            fluid={images.restockCover.childImageSharp.fluid}
            style={{
              height: '75%',
              width: '75%'
            }}
            imgStyle={{ objectFit: 'contain' }}
            alt="Restock user portfolio UI"
          />
        </div>
        <div
          className="grid-item"
          data-project="weather"
          {...weatherClickEvents}
        >
          <div className="title">
            SIDE PROJECT
            <br />
            <b>SIMPLE WEATHER</b>
          </div>
          <Img
            fluid={images.weatherCover.childImageSharp.fluid}
            style={{
              height: '75%',
              width: '75%'
            }}
            imgStyle={{ objectFit: 'contain' }}
            alt="Simple weather UI"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
