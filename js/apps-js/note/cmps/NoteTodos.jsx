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

    return <section style={{backgroundColor:note.style.bgColor,color:(note.style.bgColor === 'black')? 'white' : 'black'}} className="note-content">
     <section className="note-info-section">
    <div className="note-list">
     <div onBlur={(ev) => {funcs.onBlur(note.id,ev.target.innerText)}} contentEditable='true' className="list-label">{this.props.info.label}</div>

     <div className="list">

       <ul>

         {this.props.info.todos.map((todo) => {
           return <li onClick={() => {funcs.onDone(todo.id,note.id)}} className={todo.isDone&&'done'} key={utilService.makeId()}>{todo.txt}</li>
         })}
       </ul>
     </div>
      </div>
      </section>
      <section className="note-options-section">
      <NoteOptions funcs={funcs} note={note}/>
      </section>
  </section>
  }
}