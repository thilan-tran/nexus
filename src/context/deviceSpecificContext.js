import React from 'react';

const initState = {
  isMobile: false,
  scrollBarWidth: 17,
  customModalHeight: null
};

const ctx = React.createContext(initState);

export default ctx;
