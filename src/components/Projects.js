import React from 'react';

import WmlTimeline from '../static/wml-timeline.jpeg';
import TwainUI from '../static/twain.jpeg';
import TerreformFarm from '../static/terreform-farm.jpeg';
import RestockPortfolio from '../static/restock-portfolio.jpeg';
import WeatherUI from '../static/weather.jpeg';

const Projects = ({ openModal }) => (
  <div className="card" style={{ cursor: 'default' }}>
    <h2 id="projects">PROJECTS</h2>
    <div className="grid">
      <div
        className="grid-item"
        data-project="wml-dev-assistant"
        onClick={() => openModal('wml')}
      >
        <div className="title">
          WALMART LABS
          <br />
          <b>DEV ASSISTANT</b>
        </div>
        <img src={WmlTimeline} alt="WalmartLabs Dev Assistant timeline" />
      </div>
      <div
        className="grid-item"
        data-project="twain"
        onClick={() => openModal('twain')}
      >
        <div className="title">
          UCLA DEVX
          <br />
          <b>TWAIN</b>
        </div>
        <img src={TwainUI} alt="Twain calendar UI" />
      </div>
      <div
        className="grid-item"
        data-project="terreform"
        onClick={() => openModal('terreform')}
      >
        <div className="title">
          UCLA CREATIVE LABS
          <br />
          <b>TERREFORM</b>
        </div>
        <img src={TerreformFarm} alt="Terreform farm environment" />
      </div>
      <div
        className="grid-item"
        data-project="restock"
        onClick={() => openModal('restock')}
      >
        <div className="title">
          SIDE PROJECT
          <br />
          <b>RESTOCK</b>
        </div>
        <img src={RestockPortfolio} alt="Restock user portfolio UI" />
      </div>
      <div
        className="grid-item"
        data-project="weather"
        onClick={() => openModal('weather')}
      >
        <div className="title">
          SIDE PROJECT
          <br />
          <b>SIMPLE WEATHER</b>
        </div>
        <img src={WeatherUI} alt="Simple weather UI" />
      </div>
    </div>
  </div>
);

export default Projects;
