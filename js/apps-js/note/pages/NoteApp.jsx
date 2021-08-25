import { NotesService } from "../services/note.service.js";
import { NoteList } from './../cmps/NoteList.jsx';
import { NoteFilter } from "../cmps/NoteFilter.jsx";
export class NoteApp extends React.Component {

    state = {
        notes: null,
        filter: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        NotesService.query(this.state.filter)
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

    onBlur = (noteId,newTxt) => {
        console.log(newTxt)
        NotesService.setNoteTxt(noteId,newTxt)
        .then(() => {
            this.loadNotes()
        })
    }

    onFilter = (filter) => {
        this.setState({filter}, () => {
            this.loadNotes()
        })
    }

    funcs = {
        onDelete: this.onDelete,
        onPin: this.togglePin,
        onCopy: this.onCopy,
        loadNotes: this.loadNotes,
        onBlur: this.onBlur
    }



    render() {

        const {notes} = this.state

        return (
            <section className="note-app">
                <NoteFilter onFilter={this.onFilter}/>
                {
                  notes&&  <NoteList funcs={this.funcs} notes={notes}/> 
                }
            </section>

        );
    }
}
