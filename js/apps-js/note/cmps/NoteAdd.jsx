import { AddTxt } from './AddTxt.jsx';
import { AddImg } from './AddImg.jsx';
import { AddVideo } from './AddVideo.jsx';
import { AddTodos } from './AddTodos.jsx';


export class NoteAdd extends React.Component {
  state = {
    type: "txt",
  };

  handleChange = (ev) => {
    this.setState({type: ev.target.value})
  }

  render() {
    const { type } = this.state;
    return (
      <div className="note-add">

        <h1>Add Note!</h1>

        <div className="add-choice">
        <select onChange={this.handleChange} value={type} name="choice" id="choice">
          <option value="txt">Txt</option>
          <option value="img">Img</option>
          <option value="video">Video</option>
          <option value="todos">Todos</option>
        </select>
        </div>

        <div className="add-input">
        {

        {
          'txt': <AddTxt funcs={this.props.funcs} />,
          'img': <AddImg funcs={this.props.funcs} />,
          'video': <AddVideo funcs={this.props.funcs} />,
          'todos': <AddTodos funcs={this.props.funcs} />
        }[type]

      }
        </div>

      
      </div>
    );
  }
}
