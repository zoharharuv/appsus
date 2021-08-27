const { Link } = ReactRouterDOM;
import { NotesService } from "./../services/note.service.js";

export class NoteOptions extends React.Component {
  state = {
    isColorsShown: false,
  };

  toggleColors = () => {
    this.setState({ isColorsShown: !this.state.isColorsShown });
  };

  onColor = (color) => {
    const { id } = this.props.note;
    NotesService.setNoteBgColor(id, color).then(() => {
      this.props.funcs.loadNotes();
    });
  };

  render() {
    const { isColorsShown } = this.state;
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

          <Link to={`/mail/compose/${note.id}`}>
            <span className="material-icons">email</span>
          </Link>
        </div>

        {isColorsShown && (
          <div>
            <button
              onClick={() => {
                this.onColor("white");
              }}
            >
              {" "}
              ⚪️{" "}
            </button>
            <button
              onClick={() => {
                this.onColor("black");
              }}
            >
              {" "}
              ⚫️{" "}
            </button>
            <button
              onClick={() => {
                this.onColor("blue");
              }}
            >
              {" "}
              🔵{" "}
            </button>
            <button
              onClick={() => {
                this.onColor("purple");
              }}
            >
              {" "}
              🟣{" "}
            </button>
            <button
              onClick={() => {
                this.onColor("yellow");
              }}
            >
              {" "}
              🟡{" "}
            </button>
            <button
              onClick={() => {
                this.onColor("brown");
              }}
            >
              {" "}
              🟤{" "}
            </button>
          </div>
        )}
      </section>
    );
  }
}
