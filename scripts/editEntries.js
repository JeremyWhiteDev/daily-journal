//dataAccess TODO
//create updateEntry logic in dataAccess that takes in an argument and uses fetch and PUT method to update data.
//write data to application State before put?
//export updateEntry
//^ALL DONE

//editEntries TODO
//import updateEntry
//create logic to return html form that accepts an object as an argument.
//create an event listener that listens for a click event with an id that starts with edit btn
//
//have an empty div that I can use to tartget and display a form indise of
//have the form populated by the values of the object(s) that were clicked on

//render a cancel and a submit button that takes the values of the edit form and updates the current data by calling an updateData Function
//^ALL DONE

import { getEntries, updateEntry, deleteEntry } from "./dataAccess.js";

//returns html that will display currently clicked on object's properties
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

//When the edit button is clicked, capture the id of the button that was clicked on, use that id to find the matching object, put that object through our function that handles how to display an object, and put the result in an empty div on the DOM. add a classlist to our Overlay that gives it opacity.
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("editBtn")) {
    const entries = getEntries();
    const [, entryId] = e.target.id.split("--");
    const foundEntry = entries.find((entry) => entry.id === parseInt(entryId));

    document.getElementById("modal").innerHTML =
      displayUpdateEntryForm(foundEntry);
    document.getElementById("modal").classList.add("active");
    document.getElementById("overlay").classList.add("active");
  }
});

//when the update entry button is clicked, once again grab the entry id of the targeted object, assign the values from the form fields to a new object that has the same properties as our data, use function that patches the selected obj with the new data, reset modal div to empty and hide the overlay.
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
    document.getElementById("modal").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
  }
});

//when the close button on the modal or if the user clicks outsidde the modal, then reset modal to empty and remove overlay class that makes it visible
document.addEventListener("click", (e) => {
  if (e.target.id === "closeModalBtn" || e.target.id === "overlay") {
    document.getElementById("modal").innerHTML = "";
    document.getElementById("modal").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
  }
});

//delete a specific entry
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("deleteBtn")) {
    const [, deleteId] = e.target.id.split("--");
    deleteEntry(parseInt(deleteId));
  }
});
//TODO deal with how to update mood?

//TODO change Navbar.... what can be useful links? new journal entry button? manage entries page? edit user page? Edit view page? Darkmode button/toggle?

//sticky navbar/navbar with animation/interaction when scrolling

//Create new entry modal

//TODO fix pinned post issues.
//display posts from application state.
//change css/html structure to better render them. Maybe only displaying post title/mood/date?
//
