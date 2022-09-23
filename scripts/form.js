import { addNewEntry } from "./dataAccess.js";

//TODO change how date is captured using javascript date class
export const displayForm = () => {
  let htmlSection = `<h2>Have you made your entry today?!?</h2>
  
                  <fieldset class="entryField">
                      <label for="entryDate">Date of Entry</label>
                      <input type="Date" name="entryDate" class="entryForm_date">
                  </fieldset>
  
                  <fieldset class="entryField">
                      <label for="conceptsCovered">Concepts Covered</label>
                      <input type="text" name="conceptsCovered" class="entryForm_concepts">
                  </fieldset>
  
                  <fieldset class="entryField">
                      <label for="journalEntry">Journal Entry</label>
                      <textarea name="journalEntry" class="entryForm_journalEntry" cols="30" rows="10">
                      </textarea>
                  </fieldset>
  
                  <fieldset class="entryField">
                      <label for="mood">Mood for the Day</label>
                      <select name="mood">
                          <option value="happy">😃 Happy 😃</option>
                          <option value="sad">🙁 Sad 🙁</option>
                          <option value="curious">🤔 Curious 🤔</option>
                      </select>
                  </fieldset>
  
                  <input id="submitBtn" type="button"value="Record Journal Entry" class="btn entryForm_btn">
              `;
  document.getElementById("entryForm").innerHTML = htmlSection;
};

//add event listener for submit btn of form
document.addEventListener("click", (e) => {
  if (e.target.id === "submitBtn") {
    const entryDate = document.querySelector("input[name=entryDate]")?.value;
    const entryConcepts = document.querySelector(
      "input[name=conceptsCovered]"
    )?.value;
    const entryContent = document.querySelector(
      "textarea[name=journalEntry]"
    )?.value;
    const entryMood = document.querySelector("select[name=mood]")?.value;
    console.log(entryDate, entryConcepts, entryContent, entryMood);
    const newObj = {
      date: entryDate,
      concepts: entryConcepts,
      content: entryContent,
      mood: entryMood,
    };
    addNewEntry(newObj);
  }
});
