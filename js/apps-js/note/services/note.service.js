export const NotesService = {
query,
getNoteById,
deleteNote,
togglePin,
addNote,
setNoteBgColor
}

import { storageService } from './../../../general-services-js/storage.service.js';

import { utilService } from './../../../general-services-js/util.service.js';
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
  var noteIdx = getNoteById(noteId)
  gNotes.splice(noteIdx, 1);
  _saveNotesToStorage();
  return Promise.resolve(`Deleted ${noteId}`)
}

function _saveNotesToStorage() {
  storageService.saveToStorage('notesDB', gNotes);
}

function _loadNotes() {
  let notes = storageService.loadFromStorage('notesDB');

  if (!notes || !notes.length)
    _createNotes()
  else gNotes = notes

    _saveNotesToStorage();

}

function _createNotes() {
  gNotes = [
    {
      id: utilService.makeId(),
      type: "note-txt",
      isPinned: true,
      info: {
        txt: "Fullstack Me Baby!"
      },
      style: {
        backgroundColor: "#00d"
      }
    },
    {
      id: utilService.makeId(),
      type: "note-img",
      info: {
        url: "https://picsum.photos/200",
        title: "Bobi and Me"
      },
      style: {
        backgroundColor: "#00d"
      }
    },
    {
      id: utilService.makeId(),
      type: "note-todos",
      info: {
        label: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: null },
          { txt: "Coding power", doneAt: 187111111 }
        ]
      },
      style: {
        backgroundColor: "#00d"
      }
    },
    {
      id: utilService.makeId(),
      type: "note-video",
      info: {
        url: "https://www.youtube.com/embed/A6XUVjK9W4o",
        title: "video"
      },
      style: {
        backgroundColor: "#00d"
      }
    }
  ]
}

function togglePin(noteId){

  var noteIdx = getNoteIdx(noteId)

  gNotes[noteIdx].isPinned = !gNotes[noteIdx].isPinned
  sortPinnedFirst()
  _saveNotesToStorage();
  
  return Promise.resolve()
}

function sortPinnedFirst(){
  gNotes.sort( (noteA,noteB) => noteB.isPinned - noteA.isPinned)
}

function addNote(note){

 let newNote = JSON.parse(JSON.stringify(note))
 newNote.id = utilService.makeId()

  gNotes.push(newNote)
  _saveNotesToStorage();
  return Promise.resolve()
}

function getNoteIdx(noteId){
  return gNotes.findIndex((note) => {
    return noteId === note.id;
  })
}

function setNoteBgColor(noteId,color){
  const idx = getNoteIdx(noteId)
  gNotes[idx].style.backgroundColor = color
  _saveNotesToStorage();
  return Promise.resolve()

}
