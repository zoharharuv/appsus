import { AddTxt } from './AddTxt.jsx';
import { AddImg } from './AddImg.jsx';
import { AddVideo } from './AddVideo.jsx';
import { AddTodos } from './AddTodos.jsx';


export class NoteAdd extends React.Component {
  state = {
    type: "txt",
  };

  onSelect = (type) => {
    this.setState({type})
  }

  render() {
    const { type } = this.state;
    return (
      <div className="note-add">

        <h1>Add Note!</h1>

        <div className="add-choice">
        <span onClick={() => {this.onSelect('txt')}}>📋</span>
        <span onClick={() => {this.onSelect('todos')}}>📝</span>
        <span onClick={() => {this.onSelect('img')}}>🖼️</span>
        <span onClick={() => {this.onSelect('video')}}>🎞️</span>
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
