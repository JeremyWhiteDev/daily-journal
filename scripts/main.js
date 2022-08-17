import {getEntries} from "./entries.js"
// console.log(journalEntries);

// for (const target of journalEntries) {
//     {
//         console.log(target.entry);
//     }
// }


// for (const target of journalEntries) {
//     {
//         console.log(target.concepts);
//     }
// }


// for (const target of journalEntries) {
//     if (target.id % 2 !== 0) {
//         console.log(target.entry);
//     }
// }
const displayEntries = () => {

    const journalEntries = getEntries();
    let htmlSection = "<h2>All Journal Entries</h2>";
    for (const entry of journalEntries) {
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
        <div>
        <h3>${entry.date}</h3>
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

displayEntries()