let gNotes = null;

_loadNotes()


function query() {
  return Promise.resolve(gNotes)
}

function getNoteById(noteId) {
  var note = gNotes.find(note => {
    return noteId === note.id;
  })
  return Promise.resolve(note);
}

function deleteNote(noteId) {
  var noteIdx = gNotes.findIndex((note) => {
    return noteId === note.id;
  })
  gNotes.splice(noteIdx, 1);
  _saveNotesToStorage();
  return Promise.resolve(`Deleted ${noteId}`)
}

function _saveNotesToStorage() {
  storageService.saveToStorage('notesDB', gNotes);
}

function _loadNotes() {
  let notes = storageService.loadFromStorage('notesDB');

  if (!notes)
    _createNotes()
  else gNotes = notes

    _saveBooksToStorage();

}

function _createNotes() {
  gNotes = [
    {
      id: "n101",
      type: "note-txt",
      isPinned: true,
      info: {
        txt: "Fullstack Me Baby!"
      }
    },
    {
      id: "n102",
      type: "note-img",
      info: {
        url: "http://some-img/me",
        title: "Bobi and Me"
      },
      style: {
        backgroundColor: "#00d"
      }
    },
    {
      id: "n103",
      type: "note-todos",
      info: {
        label: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: null },
          { txt: "Coding power", doneAt: 187111111 }
        ]
      }
    }
  ]
}
