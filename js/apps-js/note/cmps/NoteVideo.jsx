import { NoteOptions } from "./NoteOptions.jsx";
export function NoteVideo({ note,funcs }) {
  return (
    <section style={note.style && note.style} className="note-content">
     
      <div className="note-video">
        <iframe src={note.info.url}>
        </iframe>
      </div>
      <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true' className="note-txt">{note.info.title}</div>
      <NoteOptions funcs={funcs} note={note} />
    </section>
  );
}
