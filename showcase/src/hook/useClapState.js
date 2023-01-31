import React, { useState } from 'react';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

export const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);

  const { count, isClicked } = clapState;

  const updateClapState = () => {
    setClapState((prevState) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
    }));
  };

  return [clapState, updateClapState];
};
