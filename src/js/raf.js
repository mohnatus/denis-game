export function raf(cb, ticksPerFrame = 1) {
  let ticksCount = 0;
  let id = null;

  function frame() {
    ticksCount++;

    let nextFrame = true;

    if (ticksCount > ticksPerFrame) {
      ticksCount = 0;
      if (!cb()) nextFrame = false;
    }

    if (nextFrame) {
      id = requestAnimationFrame(() => {
        frame();
      });
    }
  }

  frame();

  return () => {
    cancelAnimationFrame(id);
  };
}
