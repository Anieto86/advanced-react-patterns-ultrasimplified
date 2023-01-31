import React, { useState, useCallback } from 'react';

export const useDOMRef = () => {
  const [DOMRef, setRefState] = useState({});

  const setRef = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  return [DOMRef, setRef];
};
