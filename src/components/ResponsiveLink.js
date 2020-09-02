import React, { useRef, useContext } from 'react';

import DeviceSpecificContext from '../context/deviceSpecificContext';

import { useResponsiveClick } from '../utils/hooks';

const ResponsiveLink = ({ url, children, highlight = true }) => {
  const { isTouchDevice } = useContext(DeviceSpecificContext);
  const ref = useRef(null);

  const clickEvents = useResponsiveClick((evt) => {
    ref.current && ref.current.click();
    evt.stopPropagation();
  }, isTouchDevice);

  return (
    <a
      className={highlight ? 'highlight' : ''}
      href={url}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      {...clickEvents}
    >
      {children}
    </a>
  );
};

export default ResponsiveLink;
