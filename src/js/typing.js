import { raf } from "./raf";

export function typing($el, text, cb) {
  let len = 0;

  const cancel = raf(() => {
    if (len > text.length) {
      cb();
      return false;
    }

    $el.innerHTML = text.slice(0, len);
    len++;

    return true;
  }, 2);

  return cancel;
}
