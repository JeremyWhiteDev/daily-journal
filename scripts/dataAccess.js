const API = "http://localhost:8000";

//declare application state to store data locally after fetching from API
const applicationState = {
  journalEntries: [],
};

export const fetchEntries = async () => {
  //1. fetch data from API
  const data = await fetch(`${API}/journalEntries`);
  //2. create JS data from json data format
  const jsData = await data.json();
  //3. set application state to the data from the API
  applicationState.journalEntries = jsData;
};

//create data access logic
//1. export fetch calls

//TODO: Add seperate data structures for concepts and mood?

export const getEntries = () => {
  const entriesCopy = applicationState.journalEntries.map((obj) => ({
    ...obj,
  }));
  return entriesCopy;
};

// const getNewId = () => {
//   let highestId = 0;
//   if (journalEntries.length > 0) {
//     highestId = journalEntries.sort((a, b) => b.id - a.id)[0].id;
//   }
//   return highestId + 1;
// };

export const addNewEntry = async (entryObj) => {
  //declare fetchOptions
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryObj),
  };

  //fetch stringified entry obj
  const response = await fetch(`${API}/journalEntries`, fetchOptions);
  //handle response
  const jsonResponse = await response.json();
  document.dispatchEvent(new CustomEvent("stateChanged"));
  return response;
};
