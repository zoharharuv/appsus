import { NoteOptions } from "./NoteOptions.jsx"
export function NoteTxt({info,note,funcs}) {
  return <section style={note.style && note.style} className="note-content">
   
    <div className="note-txt">{info.txt}</div>
    <NoteOptions funcs={funcs} note={note}/>
  </section>
}