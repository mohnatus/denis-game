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
        clickSound.play();
        dialog.next();
        break;
      case elementIds.readyBtn:
        clickSound.play();
        backSound.pause();
        gameSound.play();
        document.body.classList.add(states.puzzleShown);
        activateGame(document.getElementById(elementIds.puzzle), () => {
          document.body.classList.add(states.win);
          document.body.classList.remove(states.puzzleShown);
          gameSound.pause();
          winSound.play();
          setTimeout(() => {
            backSound.play();
          }, 500);
        });
        break;
      case elementIds.unreadyBtn:
        clickSound.play();
        dialog.start(UNREADY);
        break;
      case elementIds.finishGame:
        clickSound.play();
        winSound.pause();

        document.body.classList.remove(states.win);
        dialog.start(WIN);
        break;
      case elementIds.addScrollModalTrigger:
        clickSound.play();
        document.body.classList.add(states.addScrollModalShown);
        document.body.classList.add(states.hasHiddenScroll);
        break;
      case elementIds.addScrollBtn:
        clickSound.play();
        document.body.classList.remove(states.addScrollModalShown);
        document.body.classList.add(states.hasScroll);
        setTimeout(() => {
          inventorySound.play();
        });
        break;
      case elementIds.showScrollModalTrigger:
        clickSound.play();
        document.body.classList.add(states.scrollModalShown);
        break;
      case elementIds.hideScrollBtn:
        clickSound.play();
        document.body.classList.remove(states.scrollModalShown);
        if (!findScroll) {
          dialog.start(BYE);
          document.body.classList.remove(states.hasHiddenScroll);
        }
        findScroll = true;
        break;
      case elementIds.byeBtn:
        clickSound.play();
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

  const initHandler = () => {
    if (!document.body.classList.contains(states.inited)) {
      backSound.play();
      dialog.start(HELLO);
      document.body.classList.add(states.inited);
    }
  };
  document.addEventListener("click", initHandler);
}
