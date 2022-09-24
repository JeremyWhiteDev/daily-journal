import { getEntries, deleteEntry } from "./dataAccess.js";

//^importing journal entry duplication function

//OBJECTIVE: Write a function that takes in the date from the journal entry and returns the day of the week that entry occurred. Display the day of the week in the journal entry card.

export const JournalEntries = () => {
  const journalEntries = getEntries();
  const findDay = (date) => {
    const d = new Date(date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = daysOfWeek[d.getDay()];
    return day;
  };

  //OBJECTIVE: Greate a function that can take any array as an argument (important for sorting later on!) and that iterates over that array and "dresses it up" in HTML, inserting it on the DOM.
  const displayEntries = (array) => {
    let htmlSection = "";
    for (const entry of array) {
      let entryMood = "";
      if (entry.mood === "happy") {
        entryMood = "😃";
      } else if (entry.mood === "sad") {
        entryMood = "🙁";
      } else if (entry.mood === "curious") {
        entryMood = "🤔";
      }
      htmlSection += `<section class="entry-post-card"> 
        <section class="entry-card-info">                      
        <h3>${findDay(entry.date)} 
        ${entry.date}</h3>
        <div>
        <h3>${entry.concepts}</h3>
        </div>
        <p class="card-emoji">${entryMood}</p>
        </section>
        <section class="card-content">
        <p class="entry-card-text">${entry.content}
        </p>
        </section>
        <section class="entry-card-buttons">
        <img class="entry-btn edit-icon" id="editBtn--${
          entry.id
        }" src="./images/Edit Icon.png">
        <img class="entry-btn delete-icon" id="deleteBtn--${
          entry.id
        }"src="./images/Trash Can Icon.png">
        </section>
        </section>`;
    }
    document.getElementById("entries").innerHTML = htmlSection;
  };
  displayEntries(journalEntries);
  // displayEntries(journalEntries)
  //^Testing function

  //OBJECTIVE: create a way to filter array by mood. by the user interacting with the HTML
  const moodBtns = document.querySelectorAll(".mood-btn");
  console.log(moodBtns);

  moodBtns.forEach((btn) => {
    //add click event listener for each button that runs a function when clicked.
    btn.addEventListener("click", (e) => {
      const allJournalEntries = getEntries();
      //get current target (button that is clicked) data id.
      const selectedMood = e.currentTarget.dataset.id;
      //create a filtered array based on the clicked button
      const entryMoodArray = allJournalEntries.filter((entry) => {
        if (entry.mood === selectedMood) {
          return entry;
        }
      });
      //displays original array for "all" button
      if (selectedMood === "all") {
        displayEntries(allJournalEntries);
      }
      //displays filtered array
      else {
        displayEntries(entryMoodArray);
      }
    });
  });

  //OBJECTIVE: create a way to sort the entries based on mood, date, or concepts. By the user interacting with the HTML
  const sortElement = document.getElementById("sort");
  //^fetches element, so that the value of that element can be read for sorting/displaying

  const sortArray = () => {
    const journalEntries = getEntries();
    //if the value of sort === date, run this code
    if (sortElement.value === "date-asc") {
      journalEntries.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (sortElement.value === "date-des") {
      journalEntries.sort((a, b) => {
        return b.id - a.id;
      });
    }
    //if the value of sort === mood, run this code, using localeCompare to sort strings
    else if (sortElement.value === "mood") {
      journalEntries.sort((a, b) => {
        return a.mood.localeCompare(b.mood);
      });
      //if the value of sort === concepts, run this code, using localeCompare to sort Strings
    } else if (sortElement.value === "concepts") {
      journalEntries.sort((a, b) => {
        return a.concepts.localeCompare(b.concepts);
      });
    }
    displayEntries(journalEntries);
  };
  sortElement.addEventListener("change", sortArray);

  document.addEventListener("click", (e) => {
    if (e.target.id.startsWith("deleteBtn")) {
      const [, deleteId] = e.target.id.split("--");
      deleteEntry(parseInt(deleteId));
    }
  });
};

//^puts unsorted JournalEntries on page by default.

//^listens for dropdown menu selection to change, and runs sort array when that value does change.

//TODO: Think of a way to have the filtered array interact with filter options. currently, sorting then filtering works, but filtering then sorting doesn't, because the filter returns a new array that the sort fucntion doesn't know about.
