import { noteService } from "../services/note.service.js";
import { NoteList } from './../cmps/NoteList.jsx';
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { mailService } from './../../mail/services/mail.service.js';
import { Loader } from "../../../general-cmps-js/Loader.jsx";
import { eventBusService } from "../../../general-services-js/event-bus-service.js";

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filter: null,
        mailTxt: ''
    }

    componentDidMount() {
        const mailId = this.props.match.params.mailId
        if (mailId) mailService.getMailById(mailId)
        .then((mail) => {
            this.setState({mailTxt: mail.body})
        })
            
        this.loadNotes()

    }

    loadNotes = () => {
        noteService.query(this.state.filter)
            .then((notes) => {
                this.setState({ notes })
            })
    }

    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    togglePin = (noteId) => {

        noteService.togglePin(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    onCopy = (note) => {
        noteService.addNote(note)
            .then(() => {
                this.loadNotes()
            })
    }

    onBlur = (noteId, newTxt) => {

        noteService.setNoteTxt(noteId, newTxt)
            .then(() => {
                this.loadNotes()
            })
    }

    onFilter = (filter) => {
        this.setState({ filter }, () => {
            this.loadNotes()
        })
    }

    onAdd = (note) => {
        noteService.addNewNote(note)
            .then(() => {
                this.loadNotes()
                eventBusService.emit('user-msg',{txt:'Note Added Successfully'})

            })
    }

    onDone = (todoId, noteId) => {
        noteService.toggleTodoDone(todoId, noteId)
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

        const { notes,mailTxt } = this.state
        if (!notes) return <Loader />
        return (
            <section className="note-app">
              
                <section className="filter-add-section">
                    <NoteAdd mailTxt={(mailTxt)? mailTxt : ''} funcs={this.funcs} />
                    <NoteFilter onFilter={this.onFilter} />
                </section>
                <section className='notes-section'>
                {
                    notes && <NoteList funcs={this.funcs} notes={notes} />
                }
                </section>
            </section>

        );
    }
}
