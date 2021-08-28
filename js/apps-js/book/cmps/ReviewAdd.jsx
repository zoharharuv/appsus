export class ReviewAdd extends React.Component {
    state = {
        review: {
            name: '',
            txt: '',
            rate: 1,
            readAt: Date.now()
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ review: { ...this.state.review, [field]: value } });
    };

    onAdd = (ev) => {
        if (!this.state.review.name && !this.state.review.txt && !this.state.review.rate) return;
        ev.preventDefault();
        const date = new Date(Date.now());
        this.setState({ review: { ...this.state.review, readAt: date } }, () => {
            this.props.onAddReview(this.state.review)
            this.cleanInputs();
        })
    };

    cleanInputs = () => {
        const newReview = {
            name: '',
            txt: '',
            rate: 1,
            readAt: Date.now()
        }
        this.setState({ review: newReview }, this.inputRef.current.focus());
    }

    render() {

        const { name, rate, txt } = this.state.review;
        return (
            <form className='review-add' onSubmit={this.onAdd}>
                <label htmlFor='name'>Your name:</label>
                <input
                    ref={this.inputRef}
                    name='name'
                    id='name'
                    type='text'
                    placeholder='Your Name'
                    value={name}
                    onChange={this.handleChange}
                    required
                />

                <label htmlFor="txt">Your review:</label>
                <textarea
                    name='txt'
                    id='txt'
                    placeholder='Write something'
                    value={txt}
                    onChange={this.handleChange}
                    rows="5"
                    minLength="1"
                    maxLength="420"
                    cols="22"
                    wrap="soft"
                    required>
                </textarea>

                <label htmlFor='rate'>Rating</label>
                <select
                    name='rate'
                    id='rate'
                    type='number'
                    placeholder='Rating'
                    value={rate}
                    onChange={this.handleChange}>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                <button className="add-review-btn">Add review</button>
            </form>
        );
    }
}
