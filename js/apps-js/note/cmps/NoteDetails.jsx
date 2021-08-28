import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { LabelPicker } from './../../../general-cmps-js/LabelPicker.jsx';
import { noteService } from './../services/note.service.js';
// state = {
//   labels: this.props.mail.labels
// }
// componentDidMount() {
//   this.setState({ labels: this.props.mail.labels })
// }

// onSetLabel = (label) => {
//   mailService.setLabel(this.props.mail, label).then(res => {
//       this.setState({ labels: res.labels })
//   })
// }

// onRemoveLabel = (label) => {
//   mailService.removeLabel(this.props.mail, label).then(res => {
//       this.setState({ labels: res.labels })
//   })
// }
export function NoteDetails({ note, funcs }) {

  switch (note.type) {
    case 'note-txt':
      return <NoteTxt funcs={funcs} note={note} info={note.info} />
    case 'note-img':
      return <NoteImg funcs={funcs} note={note} info={note.info} />
    case 'note-video':
      return <NoteVideo funcs={funcs} note={note} info={note.info} />
    case 'note-todos':
      return <NoteTodos funcs={funcs} note={note} info={note.info} />
  }
}
