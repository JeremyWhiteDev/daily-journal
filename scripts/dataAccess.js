const API = "http://localhost:8000";
//TODO: Add seperate data structures for concepts and mood?

//declare application state to store data locally after fetching from API
const applicationState = {
  journalEntries: [],
};

//Fetch data and also copy data from application state.
export const fetchEntries = async () => {
  //1. fetch data from API
  const data = await fetch(`${API}/journalEntries`);
  //2. create JS data from json data format
  const jsData = await data.json();
  //3. set application state to the data from the API
  applicationState.journalEntries = jsData;
};

export const getEntries = () => {
  const entriesCopy = applicationState.journalEntries.map((obj) => ({
    ...obj,
  }));
  return entriesCopy;
};

//Add a new entry
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

//Delete an entry
export const deleteEntry = async (id) => {
  const response = await fetch(`${API}/journalEntries/${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

// partiually Update an entry using patch method
export const updateEntry = async (id, entryObj) => {
  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryObj),
  };
  const response = await fetch(`${API}/journalEntries/${id}`, fetchOptions);
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
