import { NotesService } from "../services/note.service.js";
import { NoteList } from './../cmps/NoteList.jsx';
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
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

    onAdd = (note) => {
        NotesService.addNewNote(note)
        .then(() => {
            this.loadNotes()
        })
    }

    onDone = (todoId,noteId) => {
        NotesService.toggleTodoDone(todoId,noteId)
        .then(() => {
            this.loadNotes()
        })
    }

    funcs = {
        onDelete: this.onDelete,
        onPin: this.togglePin,
        onCopy: this.onCopy,
        loadNotes: this.loadNotes,
        onBlur: this.onBlur,
        onAdd: this.onAdd,
        onDone: this.onDone
    }



    render() {

        const {notes} = this.state

        return (
            <section className="note-app">
                <section className="filter-add-section">
                <NoteAdd funcs={this.funcs}/>
                <NoteFilter onFilter={this.onFilter}/>
                </section>
                {
                  notes&&  <NoteList funcs={this.funcs} notes={notes}/> 
                }
            </section>

        );
    }
}
