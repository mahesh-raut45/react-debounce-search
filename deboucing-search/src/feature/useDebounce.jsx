import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    console.log("timeout cleared", value);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  console.log('debounceValue>>>', debounceValue);
  return debounceValue;
}

export default useDebounce