import { activateGame } from "./puzzle";
import { BYE, HELLO, UNREADY, WIN } from "./screens";
import { Dialog } from "./dialog";
import { Smoke } from "./smoke";
import { attrs, elementIds, states } from "./selectors";
import {
  backSound,
  clickSound,
  gameSound,
  inventorySound,
  play,
  stoneSound,
  stop,
  winSound,
} from "./sound";

export function initScene() {
  const dialog = Dialog(document.getElementById(elementIds.dialog));

  let findScroll = false;

  const helper = (point) => {
    const classes = [];
    if (document.body.classList.contains(states.help))
      classes.push(states.help);

    if (point === "start") {
    }

    if (point === "smoke") {
      classes.push(states.inited);
      dialog.start(["bye"]);
    }

    if (point === "puzzle") {
      classes.push(states.inited, states.puzzleShown);

      activateGame(document.getElementById(elementIds.puzzle), () => {
        dialog.start(WIN);
        document.body.classList.remove(states.puzzleShown);
      });
    }

    if (point === "scroll") {
      classes.push(states.inited);
      dialog.start(["scroll"]);
    }

    document.body.className = classes.join(" ");
  };

  document.addEventListener("click", (e) => {
    const btn = e.target;

    switch (btn.id) {
      case elementIds.nextBtn:
        play(clickSound);
        dialog.next();
        break;
      case elementIds.readyBtn:
        stop(backSound);
        play(clickSound, gameSound);

        document.body.classList.add(states.puzzleShown);
        activateGame(document.getElementById(elementIds.puzzle), () => {
          stop(gameSound);
          stop(stoneSound);
          play(winSound);

          setTimeout(() => {
            document.body.classList.add(states.win);
            document.body.classList.remove(states.puzzleShown);
          }, 100);
        });
        break;
      case elementIds.unreadyBtn:
        play(clickSound);
        dialog.start(UNREADY);
        break;
      case elementIds.finishGame:
        play(clickSound);
        if (backSound.paused) {
          play(backSound);
        }
        document.body.classList.remove(states.win);
        dialog.start(WIN);
        break;
      case elementIds.addScrollModalTrigger:
        play(clickSound);
        document.body.classList.add(states.addScrollModalShown);
        document.body.classList.add(states.hasHiddenScroll);
        break;
      case elementIds.addScrollBtn:
        play(clickSound, inventorySound);
        document.body.classList.remove(states.addScrollModalShown);
        document.body.classList.add(states.hasScroll);
        break;
      case elementIds.showScrollModalTrigger:
        play(clickSound);
        document.body.classList.add(states.scrollModalShown);
        break;
      case elementIds.hideScrollBtn:
        play(clickSound);
        document.body.classList.remove(states.scrollModalShown);
        if (!findScroll) {
          dialog.start(BYE);
          document.body.classList.remove(states.hasHiddenScroll);
        }
        findScroll = true;
        break;
      case elementIds.byeBtn:
        play(clickSound);
        document.body.classList.add(states.finish);
        Smoke(document.getElementById(elementIds.smoke));
        break;
      default:
        if (btn.classList.contains("helper")) {
          const point = btn.dataset.point;
          helper(point);
        }
    }
  });

  const initHandler = (e) => {
    if (document.body.hasAttribute("data-loading")) return;

    if (!document.body.classList.contains(states.inited)) {
      backSound.pause();
      backSound.play();
      dialog.start(HELLO);
      document.body.classList.add(states.inited);
    }
  };
  document.addEventListener("click", initHandler);
}
