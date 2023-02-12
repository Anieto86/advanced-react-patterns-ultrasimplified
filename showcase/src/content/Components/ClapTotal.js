import React, { useContext } from 'react';
import {MediumClapContext} from '../../patterns/03';
import styles from '../../patterns/index.css';

const ClapTotal = () => {

  const{ countTotal, setRef} = useContext(MediumClapContext);
  return (
    <span ref={setRef} 
     data-refkey='clapTotalRef' 
    className={styles.total}>
      {countTotal}
    </span>
  );
};

export default ClapTotal