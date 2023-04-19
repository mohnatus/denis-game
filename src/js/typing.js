import { raf } from "./raf";
import { typeSound } from "./sound";

export function typing($el, text, cb) {
  let len = 0;

  typeSound.play();

  const cancel = raf(() => {
    if (len > text.length) {
      typeSound.pause();
      cb();
      return false;
    }

    $el.innerHTML = text.slice(0, len);
    len++;

    return true;
  }, 2);

  return cancel;
}
