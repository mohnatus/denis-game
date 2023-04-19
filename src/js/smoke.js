import img1 from "../img/smoke/1.png";
import img2 from "../img/smoke/2.png";
import img3 from "../img/smoke/3.png";
import img4 from "../img/smoke/4.png";
import img5 from "../img/smoke/5.png";
import img6 from "../img/smoke/6.png";
import img7 from "../img/smoke/7.png";
import img8 from "../img/smoke/8.png";
import img9 from "../img/smoke/9.png";
import img10 from "../img/smoke/10.png";
import img11 from "../img/smoke/11.png";
import img12 from "../img/smoke/12.png";
import { raf } from "./raf";
import { Canvas } from "./canvas";
import { states } from "./selectors";

const sprite = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const images = sprite.map((src) => {
  const $img = document.createElement("img");
  $img.src = src;
  $img.hidden = true;
  document.body.appendChild($img);
  return $img;
});

export function Smoke($el) {
  const canvas = Canvas($el);
  
  let index = 0;

  function showFrame() {
    const img = images[index];

    if (index === 7) {
      document.body.classList.add(states.fullSmoke);
    }

  

    canvas.drawImage(img)
  }

  raf(() => {
    if (index > sprite.length) return false;
    index++;
    showFrame();
    return true;
  }, 4);
}
