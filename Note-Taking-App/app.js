const chalk = require("chalk");
const notes = require("./notes")
const yargs = require("yargs");
const fs = require("fs");
const {listNotes, readNotes, readNote, editNote} = require("./notes");

//customize yargs version
yargs.version("1.1.0")

//create add command that has a required title and body uses argv to get user input
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }

})

//create remove command that requires a title and uses argv to get title from user
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//create read command that takes in a title using argv to read note
yargs.command({
    command: "read",
    describe: "Read the note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
})

//create list command that has no requirements and just lists the notes using the function
yargs.command({
    command: "list",
    describe: "List the notes",
    handler() {
        listNotes();
    }
})

//edit command that requires a title and edit to be inputted via argv
yargs.command({
    command: "edit",
    describe: "Edit the note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        edit: {
            describe: "Edit body",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        editNote(argv.title, argv.edit);
    }
})


//add remove read list

//parses the cli arguments
yargs.parse()
