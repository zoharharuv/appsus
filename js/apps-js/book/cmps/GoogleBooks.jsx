import { utilService } from './../../../general-services-js/util.service.js';
export class GoogleBooks extends React.Component {
    state = {
        title: ''
    }
    onSearchBooksDebouncedFunc
    componentDidMount() {

        this.onSearchBooksDebouncedFunc = utilService.debounce(this.onSearchBooks, 500);
    }

    onSearchChange = (ev) => {
        this.setState({ title: ev.target.value })
        this.onSearchBooksDebouncedFunc(ev)
    }

    onSearchBooks = (ev) => {
        if (!this.state.title) return this.props.onSearchGoogle();
        this.props.onSearchGoogle(this.state.title)
    }
    render() {
        const { title } = this.state;
        return (
            <section className="google-books">
                <input type="search"
                    name="title"
                    id="title"
                    placeholder="Search Google 🔍"
                    autoComplete="off"
                    value={title}
                    onChange={this.onSearchChange} />
            </section>
        )
    }
}