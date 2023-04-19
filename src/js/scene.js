import { activateGame } from "./puzzle";
import { BYE, HELLO, UNREADY, WIN } from "./screens";
import { Dialog } from "./dialog";
import { Smoke } from "./smoke";
import { elementIds, states } from "./selectors";

export function initScene() {
  const dialog = Dialog(document.getElementById(elementIds.dialog));

  document.addEventListener("click", (e) => {
    const btn = e.target;
    let findScroll = false;

    switch (btn.id) {
      case elementIds.nextBtn:
        dialog.next();
        break;
      case elementIds.readyBtn:
        document.body.classList.add(states.puzzleShown);
        activateGame(document.getElementById(elementIds.puzzle), () => {
          dialog.start(WIN);
          document.body.classList.remove(states.puzzleShown);
        });
        break;
      case elementIds.unreadyBtn:
        dialog.start(UNREADY);
        break;
      case elementIds.addScrollModalTrigger:
        document.body.classList.add(states.addScrollModalShown);
        document.body.classList.add(states.hasHiddenScroll);
        break;
      case elementIds.addScrollBtn:
        document.body.classList.remove(states.addScrollModalShown);
        document.body.classList.add(states.hasScroll);
        break;
      case elementIds.showScrollModalTrigger:
        document.body.classList.add(states.scrollModalShown);
        break;
      case elementIds.hideScrollBtn:
        document.body.classList.remove(states.scrollModalShown);
        if (!findScroll) {
          dialog.start(BYE);
          document.body.classList.remove(states.hasHiddenScroll);
        }
        findScroll = true;
        break;
      case elementIds.byeBtn:
        document.body.classList.add(states.finish);
        Smoke(document.getElementById(elementIds.smoke));
        break;
      default:
        if (btn.classList.contains("helper")) {
          const point = btn.dataset.point;
          if (point === "smoke") {
            document.body.classList.remove(states.finish);
            document.body.classList.remove(states.fullSmoke);
            document.body.classList.add(states.inited);
            dialog.start(["bye"]);
          }
        }
    }
  });

  const initHandler = () => {
    if (!document.body.classList.contains(states.inited)) {
      dialog.start(HELLO);
      document.body.classList.add(states.inited);
    }

    document.removeEventListener("click", initHandler);
  };
  document.addEventListener("click", initHandler);
}
