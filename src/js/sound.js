import { elementIds } from "./selectors";

export const backSound = document.getElementById(elementIds.backSound);
backSound.volume = 0.1;

export const clickSound = document.getElementById(elementIds.clickSound);
clickSound.volume = 0.2;

export const stoneSound = document.getElementById(elementIds.stoneSound);

export const inventorySound = document.getElementById(
  elementIds.inventorySound
);

export const gameSound = document.getElementById(elementIds.gameSound);
gameSound.volume = 0.1;

export const winSound = document.getElementById(elementIds.winSound);
winSound.volume = 0.6;

winSound.addEventListener("ended", function () {
  backSound.play();
});

export const disappearingSound = document.getElementById(
  elementIds.disapperingSound
);
disappearingSound.playbackRate = 1.5;

export function play(sound, sound2) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();

  if (sound2)
    setTimeout(() => {
      sound2.pause();
      sound2.currentTime = 0;
      sound2.play();
    });
}

export function stop(sound) {
  sound.pause();
}
