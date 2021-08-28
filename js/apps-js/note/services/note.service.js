export const noteService = {
  query,
  getNoteById,
  deleteNote,
  togglePin,
  addNote,
  setNoteBgColor,
  setNoteTxt,
  addNewNote,
  toggleTodoDone
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
  if (!note) return Promise.reject('No Such Note!')
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
      labels: [],
      type: "note-txt",
      isPinned: true,
      info: {
        txt: 'This is a note!'
      },
      style: {
        bgColor:'rgb(190, 189, 189)'
      }
    },
    {
      id: utilService.makeId(),
      type: "note-img",
      labels: [],
      info: {
        url: "https://picsum.photos/200",
        title: "Bobi and Me"
      },
      style: {
        bgColor:'rgb(114, 114, 253)'
      }
    },
    {
      id: utilService.makeId(),
      type: "note-todos",
      labels: [],
      info: {
        label: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: null, isDone:true,
        id:utilService.makeId() },
          { txt: "Coding power", doneAt: 187111111,isDone:true,
          id:utilService.makeId()}
        ]
      },
      style: {
        bgColor:'pink'
      }
    },
    {
      id: utilService.makeId(),
      type: "note-video",
      labels: [],
      info: {
        url: "https://www.youtube.com/embed/DUhq6PR7FW4",
        title: "video"
      },
      style: {
        bgColor:'rgb(243, 243, 114)'
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
  
    gNotes.sort((noteA, noteB) => noteB.isPinned - noteA.isPinned)
  
 
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
  gNotes[idx].style.bgColor = color
  _saveNotesToStorage();
  return Promise.resolve()

}

function setNoteTxt(noteId, newTxt,isTodo=false,todoId='') {
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

function getTodoIdx(todoId,noteIdx){
  return gNotes[noteIdx].info.todos.findIndex((todo) => {
    return todo.id === todoId
  })
}

function toggleTodoDone(todoId,noteId){
  const noteIdx = getNoteIdx(noteId)
  const todoIdx = getTodoIdx(todoId,noteIdx)
  gNotes[noteIdx].info.todos[todoIdx].isDone = !gNotes[noteIdx].info.todos[todoIdx].isDone
  _saveNotesToStorage()
  return Promise.resolve()
}

