import { useEffect } from 'react';
import { useState } from 'react';

export function useDebounce(value:string, delay:number = 400):string {
  const [debounced, setDebounced] = useState(value);

  useEffect(()=>{
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(handler)
  }, [value,delay]);
  return debounced
}