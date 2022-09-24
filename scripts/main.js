import { fetchEntries } from "./dataAccess.js";
import { JournalEntries } from "./entries.js";
import { displayForm } from "./form.js";
import {} from "./editEntries.js";
//^importing functions from other modules.
//file structure:
//data access.js contains all setter and getter functions
//entries.js contains all lgic having to do with dsiplaying entries to DOM, and sorting/filtering those entries
//form.js contains logic for posting new entry form to DOM and handling data from that form to create new entry
//edit entires.js contains all logic for displaying the modal that allows editing of a specific entry.

//main function that sets off all html logic topost to DOM
const render = async () => {
  await fetchEntries();
  JournalEntries();
  displayForm();
};

// whenever stateChanged is dispatched, rerun all js
document.addEventListener("stateChanged", (event) => {
  render();
});

//all js rendered by default on page load
render();
