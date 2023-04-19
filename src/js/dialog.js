import { screens } from "./screens";
import { attrs, classes, states } from "./selectors";
import { typing } from "./typing";

export function Dialog($element) {
  const $text = $element.querySelector(classes.dialogText);

  let ids = [];
  let currentIndex = 0;
  let resetCb = null;

  function setScreen(id) {
    if (typeof resetCb === "function") resetCb();

    $element.classList.add(states.typing);
    const screen = screens[id];

    resetCb = typing($text, screen.text, () => {
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
