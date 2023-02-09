import React from 'react'
import styles from '../../patterns/index.css';

const ClapTotal = ({ countTotal, setRef}) => {
  return (
    <span ref={setRef} 
    // data-refkey='clapTotalRef' 
    className={styles.total}>
      {countTotal}
    </span>
  );
};

export default ClapTotal