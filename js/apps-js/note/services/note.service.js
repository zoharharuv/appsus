export const NotesService = {
  query,
  getNoteById,
  deleteNote,
  togglePin,
  addNote,
  setNoteBgColor,
  setNoteTxt,
  addNewNote
}

import { storageService } from './../../../general-services-js/storage.service.js';

import { utilService } from './../../../general-services-js/util.service.js';
let gNotes = null;

_loadNotes()


function query(filter) {
 

  if (!filter)
    return Promise.resolve(gNotes)
  else{
    //search filter
    const {search, show} = filter
    let filteredNotes = gNotes.filter((note) => {

      switch (note.type){
        case 'note-txt':
         return note.info.txt.includes(search)
        case 'note-img':
          return note.info.title.includes(search)
        case 'note-video':
          return note.info.title.includes(search)
        case 'note-todos':
          return note.info.label.includes(search)
      }
    })
    //show filter
    let finalFilteredNotes = filteredNotes.filter((note) => {
      switch (show){
        case 'all':
          return true
          case 'txt':
            return note.type === 'note-txt'
            case 'img':
            return note.type === 'note-img'
            case 'video':
            return note.type === 'note-video'
            case 'todos':
            return note.type === 'note-todos'
      }
    })
    return Promise.resolve(finalFilteredNotes)
  }
   
}

function getNoteById(noteId) {
  var note = gNotes.find(note => {
    return noteId === note.id;
  })
  return Promise.resolve(note);
}

function deleteNote(noteId) {
  var noteIdx = getNoteIdx(noteId)
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
      
      }
    }
  ]
}

function togglePin(noteId) {

  var noteIdx = getNoteIdx(noteId)

  gNotes[noteIdx].isPinned = !gNotes[noteIdx].isPinned
  sortPinnedFirst()
  _saveNotesToStorage();

  return Promise.resolve()
}

function sortPinnedFirst() {
  gNotes.forEach(() => {
    gNotes.sort((noteA, noteB) => noteB.isPinned - noteA.isPinned)
  })
 
}

function addNote(note) {

  let newNote = JSON.parse(JSON.stringify(note))
  newNote.id = utilService.makeId()

  gNotes.push(newNote)
  _saveNotesToStorage();
  return Promise.resolve()
}

function getNoteIdx(noteId) {
  return gNotes.findIndex((note) => {
    return noteId === note.id;
  })
}

function setNoteBgColor(noteId, color) {
  const idx = getNoteIdx(noteId)
  gNotes[idx].style.backgroundColor = color
  _saveNotesToStorage();
  return Promise.resolve()

}

function setNoteTxt(noteId, newTxt) {
  const idx = getNoteIdx(noteId)

  switch (gNotes[idx].type) {
    case 'note-txt':
      gNotes[idx].info.txt = newTxt
      break
    case 'note-img':
      gNotes[idx].info.title = newTxt
      break
    case 'note-video':
      gNotes[idx].info.title = newTxt
      break
    case 'note-todos':
      gNotes[idx].info.label = newTxt
      break

  }
  _saveNotesToStorage()
  return Promise.resolve()
}

function addNewNote(note){
  gNotes.push(note)
  _saveNotesToStorage()
  return Promise.resolve()
}
