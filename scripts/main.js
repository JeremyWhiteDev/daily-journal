import { fetchEntries } from "./dataAccess.js";
import { JournalEntries } from "./entries.js";
import { displayForm } from "./form.js";
import {} from "./editEntries.js";
//^importing journal entry duplication function

const render = async () => {
  await fetchEntries();
  JournalEntries();
  displayForm();
};
const mainContainer = document.getElementById("entries");

document.addEventListener("stateChanged", (event) => {
  render();
});

render();
