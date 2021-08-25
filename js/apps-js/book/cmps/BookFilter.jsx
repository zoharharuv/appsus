export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: '',
    },
  };

  inputRef = React.createRef()

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === 'number' ? +ev.target.value : ev.target.value;
    this.setState({ filterBy: { ...this.state.filterBy, [field]: value }, }, () => {
      this.onFilter();
    });
  };

  onFilter = (ev = null) => {
    if (!this.state.filterBy.title && !this.state.filterBy.minPrice && !this.state.filterBy.maxPrice) return;
    if(ev) ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy)
  };

  render() {
    const { title, minPrice, maxPrice } = this.state.filterBy;
    return (
      <form className='book-filter' onSubmit={this.onFilter}>
        <label htmlFor='by-title'>By title</label>
        <input
          ref={this.inputRef}
          name='title'
          id='by-title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={this.handleChange}
        />
        <label htmlFor='min-Price'>Min Price</label>
        <input
          name='minPrice'
          id='min-Price'
          type='number'
          placeholder='Min Price'
          value={minPrice}
          onChange={this.handleChange}
        />
        <label htmlFor='max-Price'>Max Price</label>
        <input
          name='maxPrice'
          id='max-Price'
          type='number'
          placeholder='Max Price'
          value={maxPrice}
          onChange={this.handleChange}
        />
        <button>🔍</button>
      </form>
    );
  }
}
