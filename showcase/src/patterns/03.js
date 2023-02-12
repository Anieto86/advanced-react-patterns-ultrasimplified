import React, {
  useState,
  useCallback,
  createContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import ClapIcon from '../content/Components/ClapIcon'
import ClapCount from '../content/Components/ClapCount'
import ClapTotal from '../content/Components/ClapTotal'
import useClapAnimation  from '../hooks/useClapAnimation';
import styles from './index.css';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};


export const MediumClapContext = createContext(initialState);

const MediumClap = ({ children, onClap }) => {
  const MAXIMUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count } = clapState;

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({});

  const setRef = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });

  //Note We use useRef here for invoke useEffect callback only after mount, basicamente skip la primera invoke 
  const componentJustMounted = useRef(true);
  console.log({ componentJustMounted });

  useEffect(() => {
    //despues del render  !componentJustMounted.current = true entonce no el llamado onClap 
    if (!componentJustMounted.current) onClap && onClap({ count });
    //salgp del if in cambio el valor a false.
    // La segunda vuelta !false === true por lo tanto el onClap esi invocado y dispara se toca el botton. 
    componentJustMounted.current = false;
  }, [count]);
//

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


  const memorizeValue = useMemo(
    () => ({ ...clapState, setRef }),
    [clapState, setRef]
  );

  return (
    <MediumClapContext.Provider value={memorizeValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </MediumClapContext.Provider>
  );
};


//Usage
const Usage = () => {
  const [count, setCount] = useState(0);

  // por que esta funcion accede al clapState from MediumClap fn no soy funciones aisladas? Clousers? 
  const handleClap = (clapState) => {
    setCount(clapState.count);
  };
  
  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap}>
        <ClapIcon />
        <ClapCount />
        <ClapTotal />
      </MediumClap>
      {!!count && (
        <div className={styles.info}>{`You have clapped ${count} times`}</div>
      )}
    </div>
  );
};

export default Usage;



// subComponent;
// const ClapCount = () => {
//   const { count, setRef } = useContext(MediumClapContext);
//   return (
//     <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
//       + {count}
//     </span>
//   );
// };

// const ClapTotal = () => {
//   const { countTotal, setRef } = useContext(MediumClapContext);
//   return (
//     <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
//       {countTotal}
//     </span>
//   );
// };