export class MailFilter extends React.Component {
    state = {
        txt: '',
        isRotate: false
    };

    inputRef = React.createRef()
    refreshTimeout

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

    onRotate = () => {
        console.log('rot');
        this.setState({ isRotate: true }, () => {
            this.refreshTimeout = setTimeout(() => {
                clearTimeout(this.refreshTimeout)
                this.setState({ isRotate: false })
                this.props.onRefresh()
            }, 1000);
        })
    }

    render() {
        const { txt, isRotate } = this.state;
        const { onSetDisplay, currDisplay } = this.props;
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
                <select name="displays" id="display-picker"
                    value={currDisplay}
                    onChange={() => onSetDisplay(event.target.value)}>
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
                <img className={isRotate ? 'rotate' : 'refresh'}
                    src="img/refresh.svg"
                    onClick={this.onRotate} />
            </form>
        );
    }
}

