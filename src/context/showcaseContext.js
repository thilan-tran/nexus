import React from 'react';

const lambda = () => {};

const initState = {
  showcase: {
    init: lambda,
    draw: lambda,
    clearDraw: lambda,
    reset: lambda,
    spawn: lambda,
    spawnPrompt: '',
    optionInputAttributes: []
  },
  initOption: null,
  switchNextShowcase: lambda
};

const ctx = React.createContext(initState);

export default ctx;
