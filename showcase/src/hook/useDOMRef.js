import { useState, useCallback } from 'react';

const  useDOMRef = () => {
  const [DOMRef, setRefState] = useState({});

  const setRef = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  return [DOMRef, setRef];
};

export default  useDOMRef