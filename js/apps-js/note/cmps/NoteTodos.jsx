import { NoteOptions } from "./NoteOptions.jsx"
import { utilService } from './../../../general-services-js/util.service.js';

export class NoteTodos extends React.Component{
  state = {
    todos: null
  }

  componentDidMount() {
    this.setState({todos: this.props.info.todos})
  }

  render() {

    const {todos} = this.state
    const {note,funcs} = this.props

    return <section style={note.style && note.style} className="note-content">
     
    <div className="note-list">
     <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true' className="list-label">{this.props.info.label}</div>

     <div className="list">

       <ul>

         {this.props.info.todos.map((todo) => {
           return <li key={utilService.makeId()}>{todo.txt}</li>
         })}
       </ul>
     </div>
      </div>
      <NoteOptions funcs={funcs} note={note}/>
  </section>
  }
}