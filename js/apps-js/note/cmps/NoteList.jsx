
import { NoteDetails } from './NoteDetails.jsx';

export function NoteList({ notes,funcs }) {
  return (
    <div className="notes-list">
      {notes.map(note => <NoteDetails funcs={funcs} key={note.id} note={note}/>)}
    </div>
  )
}
