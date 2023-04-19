import { stoneSound } from "./sound";
import { isSimple } from "./sp";

function Game(config = {}) {
  const gameConfig = {
    shuffleCount: 1,
    onSuccess: () => {},
    ...config,
  };

  let $field = null;

  const target = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ];

  const field = isSimple
    ? [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, null, 15],
      ]
    : [
        [15, 12, 6, 14],
        [7, 3, 8, 2],
        [10, 11, 13, 9],
        [5, 1, 4, null],
      ];

  function getEmptyItemCoords() {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (!field[y][x]) return { x, y };
      }
    }
  }

  function shuffleFieldItems(from, to) {
    const { x: fromX, y: fromY } = from;
    const { x: toX, y: toY } = to;

    const value = field[fromY][fromX];

    field[fromY][fromX] = null;
    field[toY][toX] = value;
  }

  function createItem(i) {
    const el = document.createElement("div");
    el.classList.add("item");
    el.dataset.value = i;
    el.style.setProperty("--value", i);

    const row = Math.floor((i - 1) / 4);
    const col = (i - 1) % 4;

    el.style.setProperty("--original-x", i ? col : 3);
    el.style.setProperty("--original-y", i ? row : 3);

    const container = document.createElement("div");
    container.classList.add("item-container");
    container.textContent = i;

    el.appendChild(container);

    return el;
  }

  function getItem(x, y) {
    return $field.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  }

  function setItemPosition($item, x, y) {
    $item.dataset.x = x;
    $item.dataset.y = y;
    $item.style.setProperty("--x-position", x);
    $item.style.setProperty("--y-position", y);
  }

  function check() {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (field[y][x] !== target[y][x]) {
          return false;
        }
      }
    }

    return true;
  }

  function move(from, to) {
    const { x: fromX, y: fromY } = from;
    const { x: toX, y: toY } = to;

    stoneSound.pause();
    stoneSound.currentTime = 0;
    stoneSound.play();

    setTimeout(() => {
      shuffleFieldItems(from, to);
    });

    const $fromItem = getItem(fromX, fromY);
    const $toItem = getItem(toX, toY);

    setItemPosition($fromItem, toX, toY);
    setItemPosition($toItem, fromX, fromY);

    if (check()) {
      const cb = () => {
        setTimeout(() => {
          gameConfig.onSuccess();
        }, 500);
        $field.removeEventListener("transitionend", cb);
      };

      $field.addEventListener("transitionend", cb);
    }
  }

  function handleClick(e) {
    const $item = e.currentTarget;
    const x = Number($item.dataset.x);
    const y = Number($item.dataset.y);

    const { x: emptyX, y: emptyY } = getEmptyItemCoords();

    const xDiff = Math.abs(x - emptyX);
    const yDiff = Math.abs(y - emptyY);

    if ((!xDiff && yDiff === 1) || (!yDiff && xDiff === 1)) {
      move({ x, y }, { x: emptyX, y: emptyY });
    } else {
      return;
    }
  }

  function renderField(el) {
    $field = el;

    field.forEach((row, y) => {
      row.forEach((item, x) => {
        const $item = createItem(item);
        setItemPosition($item, x, y);
        $item.addEventListener("click", handleClick);
        $field.appendChild($item);
      });
    });
  }

  function block(blocked) {
    $field.classList.toggle("blocked", blocked);
  }

  return {
    render: renderField,
    block,
  };
}

export function activateGame($el, onSuccess) {
  const game = Game({
    onSuccess: function () {
      onSuccess();
      game.block();
    },
  });
  game.render($el);
}
