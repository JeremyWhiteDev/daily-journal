import {getEntries} from "./entries.js"
//^importing journal entry duplication function

//OBJECTIVE: Write a function that takes in the date from the journal entry and returns the day of the week that entry occurred. Display the day of the week in the journal entry card.

const findDay = (date) => {
    const d = new Date(date);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
    const day = daysOfWeek[d.getDay()]
    return day;
    }

const journalEntries = getEntries();
//^create copy in the global scope of this moddule so it can be accessed with sort function...

//OBJECTIVE: Greate a function that can take any array as an argument (important for sorting later on!) and that iterates over that array and "dresses it up" in HTML, inserting it on the DOM.
const displayEntries = (array) => {
    let htmlSection = "";
    for (const entry of array) {
        let entryMood = "";
        if (entry.mood === "happy") {
            entryMood = "😃"
        } else if (entry.mood === "sad") {
            entryMood = "🙁"
        } else if (entry.mood === "curious") {
            entryMood = "🤔"
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
        <img class="entry-btn edit-icon" src="./images/Edit Icon.png">
        <img class="entry-btn delete-icon" src="./images/Trash Can Icon.png">
        </section>
        </section>`
    }
    document.getElementById("entries").innerHTML = htmlSection;
}

// displayEntries(journalEntries)
//^Testing function

//OBJECTIVE: update the application to have the form rendered from JavaScript.
const displayForm = () => {
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

                <input type="submit" value="Record Journal Entry" class="btn entryForm_btn">
            </form>`
            document.getElementById("entryForm").innerHTML = htmlSection;
}

displayForm()
//^puts the displayForm on the page right away

//OBJECTIVE: create a way to filter array by mood. by the user interacting with the HTML
const moodBtns = document.querySelectorAll(".mood-btn")

moodBtns.forEach(btn => {
    //add click event listener for each button that runs a function when clicked.
    btn.addEventListener("click", (e) => {
        //get current target (button that is clicked) data id.
        const selectedMood = e.currentTarget.dataset.id;
        //create a filtered array based on the clicked button
        const entryMood = journalEntries.filter((entry) =>  {
            if (entry.mood === selectedMood) {
                return entry;
            }
        })
        //displays original array for "all" button 
         if (selectedMood === "all") {
            displayEntries(journalEntries)
        }
        //displays filtered array
        else {
            displayEntries(entryMood)
        }
        })
    })

//OBJECTIVE: create a way to sort the entries based on mood, date, or concepts. By the user interacting with the HTML
const sortElement = document.getElementById("sort");
//^fetches element, so that the value of that element can be read for sorting/displaying

const sortArray = () => {  
    //if the value of sort === date, run this code
    if (sortElement.value === "date-asc") {
        journalEntries.sort((a,b) => {
            return a.id - b.id
        })

    }
    else if (sortElement.value === "date-des") {
        journalEntries.sort((a,b) => {
            return b.id - a.id
        })

    }
    //if the value of sort === mood, run this code, using localeCompare to sort strings
    else if (sortElement.value === "mood") {
        journalEntries.sort((a,b) => {
            return a.mood.localeCompare(b.mood)
        })
    //if the value of sort === concepts, run this code, using localeCompare to sort Strings
    } else if (sortElement.value === "concepts") {
        journalEntries.sort((a,b) => {
            return a.concepts.localeCompare(b.concepts)
        })
    }
    displayEntries(journalEntries)
}

displayEntries(journalEntries)
//^puts unsorted JournalEntries on page by default.

sortElement.addEventListener("change", sortArray);
//^listens for dropdown menu selection to change, and runs sort array when that value does change.

//TODO: Think of a way to have the filtered array interact with filter options. currently, sorting then filtering works, but filtering then sorting doesn't, because the filter returns a new array that the sort fucntion doesn't know about.

