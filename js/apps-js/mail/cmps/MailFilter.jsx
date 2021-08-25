export class MailFilter extends React.Component {
    state = {
        txt: ''
    };

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ txt: value }, () => {
            this.onFilter();
        });
    };

    onFilter = (ev = null) => {
        if (ev) ev.preventDefault();
        this.props.onSearch(this.state.txt)
    };

    render() {
        const { txt } = this.state;
        return (
            <form className='mail-filter' onSubmit={this.onFilter}>
                <input
                    ref={this.inputRef}
                    name='search-bar'
                    type='search'
                    placeholder='🔍 Search mails'
                    value={txt}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

