//1th states default state unclicked
//2th state when the clap count
//3th state clap total

//Representar los stados con componentes

import React, { useState, useCallback ,useRef } from 'react';
import useClapAnimation from '../hooks/useClapAnimation';
import ClapCount from '../content/Components/ClapCount'
import ClapTotal from '../content/Components/ClapTotal'
import ClapIcon from '../content/Components/ClapIcon'
import styles from './index.css';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

const MediumClap = () => {
  const MAXIMUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal, isClicked } = clapState;


  //Note otra es lo mismo que el codigo comentado abbajo pero utilizando useRef hook
  const clapRef = useRef(null);
  const clapCountRef = useRef(null);
  const clapTotalRef = useRef(null);

  const animationTimeline = useClapAnimation({
    clapEl: clapRef.current,
    countEl: clapCountRef.current,
    clapTotalEl: clapTotalRef.current,
  }); 

  // const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({});



  // const setRef = useCallback((node) => {

  //   console.log({node , key: node.dataset.refkey })
  //   setRefState((prevRefState) => ({
      
  //     ...prevRefState,
  //     [node.dataset.refkey]: node,
  //   }));
  // }, []);


  // const animationTimeline = useClapAnimation({
  //   clapEl: clapRef,
  //   countEl: clapCountRef,
  //   clapTotalEl: clapTotalRef,
  // }); 

  const handleClapClick = () => {
    animationTimeline.replay();
    setClapState((prevState) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
    }));
  };

  return (
    <div>
      <button
        ref={clapRef}
        // data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        <ClapIcon isClicked={isClicked} />
        <ClapCount count={count} 
        //  setRef={setRef} 
        setRef={clapCountRef}  />
        <ClapTotal countTotal={countTotal} 
        //  setRef={setRef} 
        setRef={clapTotalRef} />
      </button>
      <div>
        <h1>Animated via a HOOK</h1>
      </div>
    </div>
  );
};

const Usage = () => <MediumClap />;

export default Usage;
