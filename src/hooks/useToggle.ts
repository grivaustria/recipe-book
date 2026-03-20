import { useCallback, useEffect, useState } from "react";

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle] as const;
};
