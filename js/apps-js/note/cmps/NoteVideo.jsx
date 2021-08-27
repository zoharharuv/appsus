import { NoteOptions } from "./NoteOptions.jsx";
export function NoteVideo({ note,funcs }) {
  return (
    <section style={{backgroundColor:note.style.bgColor,color:(note.style.bgColor === 'black')? 'white' : 'black'}} className="note-content">
     <section className="note-info-section">
      <div className="note-video">
        <iframe src={note.info.url}>
        </iframe>
      </div>
      <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true' className="note-txt">{note.info.title}</div>
      </section>
      <section className="note-options-section">
      <NoteOptions funcs={funcs} note={note} />
      </section>
    </section>
  );
}
