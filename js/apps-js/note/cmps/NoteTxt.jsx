import { NoteOptions } from "./NoteOptions.jsx"



export function NoteTxt({info,note,funcs}) {
  
  return <section content style={{backgroundColor:note.style.bgColor,color:(note.style.bgColor === 'black')? 'white' : 'black'}} className="note-content">
   <section className="note-info-section">
    <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true'  className="note-txt">
      {info.txt}
    </div>
    </section>
    <section className="note-options-section">
    <NoteOptions funcs={funcs} note={note}/>
    </section>

  </section>
}