import { NoteOptions } from "./NoteOptions.jsx"

export function NoteTxt({info,note,funcs}) {
  
  return <section content style={{backgroundColor:note.style.bgColor}} className="note-content">
   
    <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true'  className="note-txt">{info.txt}</div>
    <NoteOptions funcs={funcs} note={note}/>
  </section>
}