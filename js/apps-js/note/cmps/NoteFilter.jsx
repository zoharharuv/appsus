export class NoteFilter extends React.Component {
  state = {
    filter: {
      search: "",
      show: "all",
    },
  };

  handleChange = (ev) => {
    if (ev.target.name === "search")
      this.setState({
        filter: { ...this.state.filter, ["search"]: ev.target.value },
      },() => {
        this.props.onFilter(this.state.filter)
      })

      else
      this.setState({
        filter: { ...this.state.filter, ["show"]: ev.target.value },
      }, () => {
        this.props.onFilter(this.state.filter)
      })


  };

  render() {
    const { filter } = this.state;
    return (
      <div className="note-filter">
        <h1>Filter Your Notes!</h1>
        <input
          name="search"
          onChange={this.handleChange}
          value={filter.search}
          placeholder="Search Notes"
          type="text"
        />

<select onChange={this.handleChange} value={filter.show} name="show" id="show">
  <option value="all">all</option>
  <option value="txt">txt</option>
  <option value="img">img</option>
  <option value="video">video</option>
  <option value="todos">todos</option>
</select>
        
      </div>
    );
  }
}
