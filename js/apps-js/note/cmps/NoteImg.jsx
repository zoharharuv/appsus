import { NoteOptions } from "./NoteOptions.jsx"

export function NoteImg({info,note,funcs}) {
  return <section style={{backgroundColor:note.style.bgColor}} className="note-content">
   
    <div className="note-img">
      <img src={info.url} alt="" />
    </div>
    <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true' className="note-txt">{info.title}</div>
    <NoteOptions funcs={funcs} note={note}/>
  </section>
}