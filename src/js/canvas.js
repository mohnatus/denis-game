export function Canvas($el) {
  const ctx = $el.getContext("2d");

  function clear() {
    ctx.clearRect(0, 0, $el.width, $el.height);
  }

  function drawImage(img) {
    clear();

    if (!img) return;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      0,
      0,
      $el.width,
      $el.height
    );
  }

  return {
    clear,
    drawImage,
  };
}
