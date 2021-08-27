export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: '',
    },
  };


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
    if (ev) ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy)
  };

  render() {
    const { title, minPrice, maxPrice } = this.state.filterBy;
    return (
      <form className='book-filter' onSubmit={this.onFilter}>
        <input
          name='title'
          id='by-title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={this.handleChange}
        />
        <div className="filter-price">

          <input
            name='minPrice'
            id='min-Price'
            type='number'
            placeholder='Min Price'
            value={minPrice}
            onChange={this.handleChange}
          />
          <input
            name='maxPrice'
            id='max-Price'
            type='number'
            placeholder='Max Price'
            value={maxPrice}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
