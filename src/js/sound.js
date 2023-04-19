import { elementIds } from "./selectors";

export const backSound = document.getElementById(elementIds.backSound);
backSound.volume = 0.02;


export const clickSound = document.getElementById(elementIds.clickSound);
typeSound.volume = 0.2;

export const stoneSound = document.getElementById(elementIds.stoneSound);

export const inventorySound = document.getElementById(elementIds.inventorySound);

export const gameSound = document.getElementById(elementIds.gameSound);
gameSound.volume = 0.06;

export const winSound = document.getElementById(elementIds.winSound);
winSound.volume = 0.6;

export const disappearingSound = document.getElementById(elementIds.disapperingSound);
disappearingSound.playbackRate = 1.5;
