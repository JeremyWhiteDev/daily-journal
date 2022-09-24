//dataAccess TODO
//create updateEntry logic in dataAccess that takes in an argument and uses fetch and PUT method to update data.
//write data to application State before put?
//export updateEntry
//DONE

//editEntries TODO
//import updateEntry
//create logic to return html form that accepts an object as an argument.
//create an event listener that listens for a click event with an id that starts with edit btn
//
//have an empty div that I can use to tartget and display a form indise of
//have the form populated by the values of the object(s) that were clicked on

//render a cancel and a submit button that takes the values of the edit form and updates the current data by calling an updateData Function

import { addNewEntry, getEntries, updateEntry } from "./dataAccess.js";

export const displayUpdateEntryForm = (obj) => {
  return `
  <div id="edit-entry-container">
  <form class="edit-entry-form">
<fieldset class="entryField">
    <label for="updateConcepts">Concepts Covered</label>
    <input type="text" name="updateConcepts" class="entryForm_concepts" value="${obj.concepts}">
</fieldset>

<fieldset class="entryField">
    <label for="updateEntry">Journal Entry</label>
    <textarea name="updateEntry" class="entryForm_journalEntry" cols="30" rows="10" value="">${obj.content}
    </textarea>
</fieldset>



<input id="closeModalBtn" type="button"value="Cancel" class="btn entryForm_btn">
<input id="updateBtn--${obj.id}" type="button"value="Update Journal Entry" class="btn entryForm_btn">
</form>
</div>`;
};

document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("editBtn")) {
    const entries = getEntries();
    const [, entryId] = e.target.id.split("--");
    const foundEntry = entries.find((entry) => entry.id === parseInt(entryId));

    document.getElementById("modal").innerHTML =
      displayUpdateEntryForm(foundEntry);
    document.getElementById("overlay").classList.add("active");
  }
});
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("updateBtn")) {
    const [, entryId] = e.target.id.split("--");
    const concepts = document.querySelector(
      "input[name=updateConcepts]"
    )?.value;
    const entry = document.querySelector("textarea[name=updateEntry]")?.value;

    const newObj = {
      concepts: concepts,
      content: entry,
    };
    updateEntry(entryId, newObj);
    document.getElementById("modal").innerHTML = "";
    document.getElementById("overlay").classList.remove("active");
  }
});
document.addEventListener("click", (e) => {
  if (e.target.id === "closeModalBtn" || e.target.id === "overlay") {
    document.getElementById("modal").innerHTML = "";
    document.getElementById("overlay").classList.remove("active");
  }
});

// TODO handle logic for update entry click event,
//pushing to storage
//re-render page (dispatch stagechanged event listener)

//TODO deal with how to update mood?
