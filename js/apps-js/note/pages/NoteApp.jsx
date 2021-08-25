import { NotesService } from "../services/note.service.js";
import { NoteList } from './../cmps/NoteList.jsx';

export class NoteApp extends React.Component {

    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        NotesService.query()
        .then((notes) => {
            this.setState({notes})
        })
    }

    onDelete = (noteId) => {
        NotesService.deleteNote(noteId)
        .then(() => {
            this.loadNotes()
        })
    }

    togglePin = (noteId) => {

        NotesService.togglePin(noteId)
        .then(() => {
            this.loadNotes()
        })
    }

    onCopy = (note) => {
        NotesService.addNote(note)
        .then(() => {
            this.loadNotes()
        })
    }

    funcs = {
        onDelete: this.onDelete,
        onPin: this.togglePin,
        onCopy: this.onCopy,
        loadNotes: this.loadNotes

    }



    render() {

        const {notes} = this.state

        return (
            <section className="note-app">
                {
                  notes&&  <NoteList funcs={this.funcs} notes={notes}/> 
                }
            </section>

        );
    }
}
