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
    const {mailTxt} = this.props
    const { type } = this.state;
    return (
      <div className="note-add">

        <h1><span title='Add New Note!' className="material-icons add-icon">
add
</span></h1>
        <section className="input-add-section">
          
        <div className="add-choice">
        <button className='material-icons' onClick={() => {this.onSelect('txt')}}>description</button>
        <button className='material-icons' onClick={() => {this.onSelect('todos')}}>checklist</button>
        <button className='material-icons' onClick={() => {this.onSelect('img')}}>add_photo_alternate</button>
        <button className='material-icons' onClick={() => {this.onSelect('video')}}>ondemand_video</button>
        </div>

        <div className="add-input">
        {

        {
          'txt': <AddTxt mailTxt={(mailTxt)? mailTxt : ''} funcs={this.props.funcs} />,
          'img': <AddImg funcs={this.props.funcs} />,
          'video': <AddVideo funcs={this.props.funcs} />,
          'todos': <AddTodos funcs={this.props.funcs} />
        }[type]

      }
        </div>

        </section>
      </div>
    );
  }
}
