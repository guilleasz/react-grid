import { useRef, useEffect } from "react";

const useDebouncedEffect = (callback, dependencies, interval) => {
  const timeoutId = useRef(null);
  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback();
    }, interval);
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDebouncedEffect;
