import { useState } from 'react';

const lambda = () => {};

export const useOnMobileClick = (
  onClick,
  customDownCheck = lambda,
  delay = 300
) => {
  const [touchDown, setTouchDown] = useState(null);

  const onTouchMove = () => setTouchDown(null);
  const onTouchStart = (evt) =>
    customDownCheck(evt) && setTouchDown(new Date());
  const onTouchEnd = (evt) => {
    if (touchDown && new Date() - touchDown > delay) {
      onClick(evt);
      setTouchDown(null);
    }
  };

  return { onTouchMove, onTouchStart, onTouchEnd };
};
