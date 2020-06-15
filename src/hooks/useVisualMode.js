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

