//1th states default state unclicked
//2th state when the clap count
//3th state clap total

//Representar los stados con componentes

import React, {
  useState,
  useCallback,
  createContext,
  useMemo,
  useContext,
  useEffect,
  useRef,
} from 'react';
import ClapIcon from '../content/Components/ClapIcon'

import useClapAnimation  from '../hook/useClapAnimation';
import styles from './index.css';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

const MediumClapContext = createContext();
const { Provider } = MediumClapContext;

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

  const componentJustMounted = useRef(true);
  console.log({ componentJustMounted });

  useEffect(() => {
    if (!componentJustMounted.current) onClap && onClap({ count });
    componentJustMounted.current = false;
  }, [count]);

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
    <Provider value={memorizeValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </Provider>
  );
};

// subComponent;


const ClapCount = () => {
  const { count, setRef } = useContext(MediumClapContext);
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
      + {count}
    </span>
  );
};

const ClapTotal = () => {
  const { countTotal, setRef } = useContext(MediumClapContext);
  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
      {countTotal}
    </span>
  );
};

//Usage
const Usage = () => {
  const [count, setCount] = useState(0);

  // por que esta funcion accede al clapState from MediumClap fn no soy funciones aisladas?
  const handleClap = (clapState) => {
    setCount(clapState.count);
  };
  console.log(!!count);
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
