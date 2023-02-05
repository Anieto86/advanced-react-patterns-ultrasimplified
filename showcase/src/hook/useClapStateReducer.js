import { useCallback, useEffect, useRef, useState, useReducer } from 'react';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

const MAXIMUM_USER_CLAP = 50;

const reducer = ({ count, countTotal }, { type, payload }) => {
  switch (type) {
    case 'clap':
      return {
        isClicked: true,
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
      };

    case 'reset':
      return payload;

    default:
      break;
  }
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useClapState = (initialState = INITIAL_STATE) => {
  const userInitialState = useRef(initialState);
  const [clapState, dispatch] = useReducer(reducer, initialState);

  const { count, countTotal } = clapState;

  const updateClapState = () => dispatch({ type: 'clap' });

  const resetRef = useRef(0);
  const prevCount = usePrevious(count);

  const handleReset = useCallback(() => {
    if (prevCount !== count) {
      dispatch({ type: 'reset', payload: userInitialState.current });
      resetRef.current++;
    }
  }, [prevCount, count, dispatch]);

  return [
    clapState,
    updateClapState,
    handleReset,
    { resetDep: resetRef.current },
  ];
};

export default useClapState;
