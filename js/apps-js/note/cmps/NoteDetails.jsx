import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';

export function NoteDetails({ note, funcs }) {
  switch (note.type) {
    case 'note-txt':
      return <NoteTxt funcs={funcs} note={note} info={note.info} />
    case 'note-img':
      return <NoteImg funcs={funcs} note={note} info={note.info} />
    case 'note-video':
      return <NoteVideo funcs={funcs} note={note} info={note.info} />
    case 'note-todos':
      return <NoteTodos funcs={funcs} note={note} info={note.info} />
  }
}
