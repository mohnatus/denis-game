export const screens = {
  hello: {
    text: "Приветствую, путник!",
  },
  warning: {
    text: "Впереди тебя ожидают тяжелейшие испытания.",
  },
  ready: {
    text: "Готов ли ты начать?",
  },

  coward: {
    text: "Трусливый слизняк!",
  },

  win: {
    text: "Поздравляю! Ты справился с первым испытанием!",
  },
  forward: {
    text: "Но впереди их еще много...",
  },
  scroll: {
    text: "Возьми этот свиток, он тебе пригодится.",
  },

  memento: {
    text: 'И запомни еще кое-что...'
  },
  hint: {
    text: "Даже в самом пустом из самых пустых есть двойное дно...",
  },
  bye: {
    text: "Прощай!",
  },
};

export const HELLO = ["hello", "warning", "ready"];
export const UNREADY = ["coward", "warning", "ready"];
export const WIN = ["win", "forward", "scroll"];
export const BYE = ["memento", "hint", "bye"];
