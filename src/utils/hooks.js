import { useState } from 'react';

const lambda = () => true;

export const useResponsiveClick = (
  onClick,
  isMobile = false,
  customClickCheck = lambda,
  delay = 300
) => {
  const [touchDown, setTouchDown] = useState(null);

  if (isMobile) {
    const onTouchMove = () => setTouchDown(null);
    const onTouchStart = (evt) =>
      customClickCheck(evt) && setTouchDown(new Date());
    const onTouchEnd = (evt) => {
      if (touchDown && new Date() - touchDown < delay) {
        onClick(evt);
        setTouchDown(null);
        evt.preventDefault();
      }
    };
    return { onTouchMove, onTouchStart, onTouchEnd };
  } else {
    return {
      onClick: (evt) =>
        customClickCheck(evt) && onClick(evt)
    };
  }
};
