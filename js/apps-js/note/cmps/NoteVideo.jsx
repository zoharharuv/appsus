import { NoteOptions } from "./NoteOptions.jsx";
export function NoteVideo({ note,funcs }) {
  return (
    <section style={note.style && note.style} className="note-content">
     
      <div className="note-video">
        <iframe src={note.info.url}>
        </iframe>
      </div>
      <div className="note-txt">{note.info.title}</div>
      <NoteOptions funcs={funcs} note={note} />
    </section>
  );
}
