const { Link } = ReactRouterDOM;
import { noteService } from "./../services/note.service.js";
import { LabelPicker } from './../../../general-cmps-js/LabelPicker.jsx';
export class NoteOptions extends React.Component {

  state = {
    labels: this.props.note.labels,
    isColorsShown: false
  }

  componentDidMount() {
    this.setState({ labels: this.props.note.labels })
  }

  onSetLabel = (label) => {
    noteService.setLabel(this.props.note, label).then(res => {
      this.setState({ labels: res.labels })
    })
  }

  onRemoveLabel = (label) => {
    noteService.removeLabel(this.props.note, label).then(res => {
      this.setState({ labels: res.labels })
    })
  }


  toggleColors = () => {
    this.setState({ isColorsShown: !this.state.isColorsShown });
  };

  toggleLabels = () => {
    this.setState({ isLabelsShown: !this.state.isLabelsShown });
  };

  onColor = (color) => {
    const { id } = this.props.note;
    noteService.setNoteBgColor(id, color).then(() => {
      this.props.funcs.loadNotes();
    });
  };


  render() {
    const { isColorsShown, labels } = this.state;
    const { note, funcs } = this.props;
    return (
      <section className="options-section">
        <div className="options-actions">
          <button
            onClick={() => {
              funcs.onDelete(note.id);
            }}
          >
            <span className="material-icons">delete</span>
          </button>

          <button
            className={note.isPinned ? "pin" : ""}
            onClick={() => {
              funcs.onPin(note.id);
            }}
          >
            <span className="material-icons">place</span>
          </button>

          <button
            onClick={() => {
              funcs.onCopy(note);
            }}
          >
            <span className="material-icons">file_copy</span>
          </button>

          <button onClick={this.toggleColors}>
            <span className="material-icons">palette</span>
          </button>

          <button><Link to={`/mail/compose/${note.id}`}>
            <span className="material-icons">email</span>
          </Link></button>
          <button><LabelPicker onSetLabel={this.onSetLabel} /></button>
        </div>
        {labels.length > 0 && <div className="printed-labels">
          {labels.map((label, idx) => <span onClick={() => this.onRemoveLabel(label)} className={`label label-${label}`} key={idx}>{label}</span>)}
        </div>}
        {isColorsShown && (
          <section className="options-colors-section">
            <div className="option-color">
              <div onClick={() => { this.onColor('white') }} className="option-color-circle white">

              </div>
            </div>
            <div className="option-color">
              <div onClick={() => { this.onColor('rgb(190, 189, 189)') }} className="option-color-circle gray">

              </div>
            </div>
            <div className="option-color">
              <div onClick={() => { this.onColor('rgb(114, 114, 253)') }} className="option-color-circle blue">

              </div>
            </div>
            <div className="option-color">
              <div onClick={() => { this.onColor('pink') }} className="option-color-circle pink">

              </div>
            </div>
            <div className="option-color">
              <div onClick={() => { this.onColor('rgb(243, 243, 114)') }} className="option-color-circle yellow">

              </div>
            </div>
          </section>

        )}
      </section>
    );
  }
}
