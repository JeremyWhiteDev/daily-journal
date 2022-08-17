const journalEntries = [
    {
        id: 1,
        date: "7-15-22",
        concepts: "Flexbox",
        content: "Flexbox is super powerful. Are there limits to when to use it or when to just use positioning properties? The amount of items in my daily journal app with display:flex is kind of bananas. In one card I'm using it like three different times! Are there better conventions for laying things out using other positioning properties?",
        mood: "curious"
    },
    {
        id: 2,
        date: "7-17-22",
        concepts: "HTML & CSS",
        content: "Organizing CSS rules is overwhelming. Already in my Daily Journal project I have over 250 lines of CSS. I think now that I could refactor most of that code and use helper or utility classes and styling so as not to copy and past so many of the same CSS properties, such as border, box shadow, Flexbox, etc.",
        mood: "sad"
    },
    {
        id: 3,
        date: "7-19-22",
        concepts: "Git and Github",
        content: "Committing early and often in Git is very important. I learned today that we shouldn't be afraid of doing too many commits. Usually these commits will be on a separate branch, so they won't interfere with someone else's workflow.",
        mood: "happy"
    }
];

export const getEntries = () => {
    const entriesCopy = journalEntries.map(obj => ({...obj}))
    return entriesCopy;
}

