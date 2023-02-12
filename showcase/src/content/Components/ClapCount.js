import React, { useContext } from 'react';
import {MediumClapContext} from '../../patterns/03';
import styles from '../../patterns/index.css';

const ClapCount = () => {


  const { count, setRef } = useContext(MediumClapContext);
 
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
      + {count}
    </span>
  );
};

export default ClapCount;
