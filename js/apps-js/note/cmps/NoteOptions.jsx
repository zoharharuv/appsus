
import { NotesService } from './../services/note.service.js';

export class NoteOptions extends React.Component{

  state = {
    isColorsShown: false
  }

  toggleColors = () => {
    this.setState({isColorsShown: !this.state.isColorsShown})
  }

  onColor = (color) => {
    const {id} = this.props.note
    NotesService.setNoteBgColor(id,color)
    .then(() => {
      this.props.funcs.loadNotes()
    })
  }


  render() {
    const {isColorsShown} = this.state
    const {note,funcs} = this.props
    return <section className="options-section">
<div className="options-actions">
      <button onClick={() => {funcs.onDelete(note.id)}}>🗑️</button>

      <button className={(note.isPinned)? 'pin': ''} onClick={() => {funcs.onPin(note.id)}}>📌</button>

      <button onClick={() => {funcs.onCopy(note)}}>➕</button>


      <button onClick={this.toggleColors}>🎨</button>
      </div>

    { isColorsShown&& 
    <div>
<button onClick={() => {this.onColor('yellow')}}> 🟡 </button>
<button onClick={() => {this.onColor('green')}}> 🟢 </button>
<button onClick={() => {this.onColor('blue')}}> 🔵 </button>
<button onClick={() => {this.onColor('purple')}}> 🟣 </button>
<button onClick={() => {this.onColor('red')}}> 🔴 </button>
    </div>

    }
    </section>
  }
}