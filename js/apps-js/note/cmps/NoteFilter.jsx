export class NoteFilter extends React.Component {
  state = {
    filter: {
      search: "",
      show: "all",
    },
  };

  handleChange = (ev) => {
    ev.preventDefault()
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
        
        <h1><span title='Filter Your Notes!' className="material-icons filter-icon">
filter_alt
</span></h1>
  
        <form className='filter-choices' action="">
          <button className='material-icons' onClick={this.handleChange} value='txt'>description</button>
          <button className='material-icons' onClick={this.handleChange} value='todos'>checklist</button>
          <button className='material-icons' onClick={this.handleChange} value='img'>add_photo_alternate</button>
          <button className='material-icons' onClick={this.handleChange} value='video'> ondemand_video</button>
        </form>

        <input
          name="search"
          onChange={this.handleChange}
          value={filter.search}
          placeholder="Search Notes"
          type="text"
        />
        
      </div>
    );
  }
}
