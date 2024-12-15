const fs = require('fs');
const chalk = require("chalk");

//function that gets notes, but never implemented
const getNotes = () => {
    return "Your notes..."
}

//function that adds notes that takes in a title and body
// checks for duplicates using find if no duplicates than pus the new note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body,
        });

        saveNotes(notes);
        console.log(chalk.bgGreen("New note added!"));
    }else {
        console.log(chalk.bgRed("Note title taken!"));
    }
}

//remove note function
//filters out notes that don't match the title of the one you want to remove
//uses that new array and saves it so that you have an array that doesn't have the one with the title you put in
const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter(note => {return note.title !== title})
    if (notes.length > keepNotes.length){
        console.log(chalk.bgGreen("Note removed!"))
        saveNotes(keepNotes);
    } else {
        console.log(chalk.bgRed("Note not found!"))
    }
}

//saves notes helper function that changes the notes inside the json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//load notes helper function that gives the notes as an array of objects to be able to use JS with it
const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
}

//function that list all notes by iterating through the notes and printing each note
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue("Your notes"))
    notes.forEach(note => {
        console.log(note.title);
    })
}

//reads notes by using a title and finding it from the notes
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title);
    if (!note){
        console.log(chalk.bgRed("Note not found!"))
    }else {
        console.log(chalk.inverse("Title: " + note.title + "\n Body: " + note.body));
    }
}

//edit note uses find to find the title of the note wanted to edit
//use remove note and add note to add note with the same title and your edit message
//this removes any note with that title and replaces it with the edited one
const editNote = (title, edit) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title);
    if (!note){
        console.log(chalk.bgRed("Note not found!"))
    }else {
        removeNote(note.title);
        addNote(note.title, edit);

        console.log(chalk.bgCyan("Title: " + note.title));
        console.log("Edit: " + edit);
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    editNote: editNote,
}