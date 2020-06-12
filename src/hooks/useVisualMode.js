import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  }

  // Add the code to implement the back action.
  // Every time we add a mode to our history it goes to the top of the stack, 
  // this means to transition back to the previous mode, all we need to do is remove the last item from the stack, 
  // and then setMode with the last item in the array.

  function back() {
      if (history.length > 1) {
        const historyStack = history.slice(0, history.length-1);
        setHistory([...historyStack])
        setMode(history[history.length-2])
      }else { 
        setMode(mode);
      }
    }
  return { mode, transition, back };
};

