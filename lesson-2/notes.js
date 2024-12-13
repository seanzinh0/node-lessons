const fs = require('fs');
const chalk = require("chalk");

const getNotes = () => {
    return "Your notes..."
}

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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue("Your notes"))
    notes.forEach(note => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title);
    if (!note){
        console.log(chalk.bgRed("Note not found!"))
    }else {
        console.log(chalk.inverse("Title: " + note.title + "\n Body: " + note.body));
    }
}

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