import { states } from "./selectors";

const sp = new URLSearchParams(location.search.slice(0));

const isTest = sp.has('test');
const isHelp = isTest || sp.has('help');
const isSimple = isTest || sp.has('simple')

if (isHelp) {
  document.body.classList.add(states.help);
}

export { isTest, isHelp, isSimple }

