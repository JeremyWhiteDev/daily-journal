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

import { getEntries, updateEntry } from "./dataAccess.js";

const displayUpdateEntryForm = (obj) => {
  return `
<fieldset class="entryField">
    <label for="conceptsCovered">Concepts Covered</label>
    <input type="text" name="conceptsCovered" class="entryForm_concepts" value="${obj.concepts}">
</fieldset>

<fieldset class="entryField">
    <label for="journalEntry">Journal Entry</label>
    <textarea name="journalEntry" class="entryForm_journalEntry" cols="30" rows="10" value="${obj.content}">
    </textarea>
</fieldset>



<input id="updateBtn" type="button"value="Update Journal Entry" class="btn entryForm_btn">
</form>`;
};

document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("editBtn")) {
    const entries = getEntries();
    const [, entryId] = parseInt(e.target.id.split("--"));
    const foundEntry = entries.find((entry) => entry.id === entryId);
  }
});
