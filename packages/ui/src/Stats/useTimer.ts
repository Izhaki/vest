import * as React from 'react';

export default function useTimer(
  startTime = performance.now(),
  endTime,
  minInterval = 100
) {
  const requestRef = React.useRef(null);
  const previousTimeRef = React.useRef(null);
  const [duration, setDuration] = React.useState(null);

  // There is some odd bug where sometimes cancelAnimationFrame doesn't actually stops handleTick
  // Calling itself and because `run` value is that at the time handleTick was declared (true)
  // The loop never ends. Using a ref here ensures it sees the correct value.
  const isRunning = React.useRef(false);
  isRunning.current = endTime === null;

  const handleTick = React.useCallback((time) => {
    const deltaTime = time - previousTimeRef.current;
    if (deltaTime > minInterval) {
      setDuration(time - startTime);
      previousTimeRef.current = time;
    }

    if (isRunning.current) {
      requestRef.current = requestAnimationFrame(handleTick);
    }
  }, []);

  React.useEffect(() => {
    if (isRunning.current) {
      setDuration(0);
      previousTimeRef.current = startTime;
      requestRef.current = requestAnimationFrame(handleTick);
    } else {
      cancelAnimationFrame(requestRef.current);
      setDuration(endTime - startTime);
      previousTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning.current]);

  return duration;
}
