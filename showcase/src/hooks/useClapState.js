import  { useCallback, useEffect, useRef, useState } from 'react';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};


const usePrevious = (value) => {
  const ref = useRef();
  useEffect(()=>{
    ref.current = value;
  })
  return ref.current
}

 const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50;
  const userInitialState = useRef(initialState)
  const [clapState, setClapState] = useState(initialState);

  const { count,  countTotal } = clapState;

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

  const resetRef = useRef(0)
  const prevCount = usePrevious(count)
  const handleReset= useCallback(()=> {
    if (prevCount !== count) {
      console.log({prevCount, count})
      setClapState(userInitialState.current)
      resetRef.current++
    }
  }, [prevCount,count, setClapState])

  return [clapState, updateClapState, handleReset, {resetDep : resetRef.current}];
};


export default useClapState