import { NoteOptions } from "./NoteOptions.jsx"

export function NoteTxt({info,note,funcs}) {
  
  return <section content style={note.style && note.style} className="note-content">
   
    <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true'  className="note-txt">{info.txt}</div>
    <NoteOptions funcs={funcs} note={note}/>
  </section>
}