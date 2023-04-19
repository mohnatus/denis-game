import { screens } from "./screens";
import { attrs, classes, states } from "./selectors";
import { typing } from "./typing";

export function Dialog($element) {
  const $text = $element.querySelector(classes.dialogText);

  let unreadyCount = 0;

  let ids = [];
  let currentIndex = 0;
  let resetCb = null;

  function setScreen(id) {
    
    if (typeof resetCb === "function") resetCb();

    $element.classList.add(states.typing);
    const screen = screens[id];

    let text = screen.text;

    if (id === 'coward') {
      unreadyCount++;
      if (unreadyCount > 1) text += ` x${unreadyCount}`
    }

    resetCb = typing($text, text, () => {
      $element.classList.remove(states.typing);
    });

    $element.setAttribute(attrs.screenId, id);

    if (id === ids[ids.length - 1]) {
      $element.classList.add(states.lastScreen);
    } else {
      $element.classList.remove(states.lastScreen);
    }
  }

  function start(screenIds) {
    $text.innerHTML = "";
    ids = screenIds;
    currentIndex = 0;
    setScreen(ids[currentIndex]);
  }

  function next() {
    if (currentIndex < ids.length - 1) {
      currentIndex++;
      setScreen(ids[currentIndex]);
    }
  }

  return {
    start,
    next,
  };
}
