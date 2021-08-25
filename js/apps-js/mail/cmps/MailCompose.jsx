export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: ''
        }
    }

    inputRef = React.createRef()
    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleChange = (ev) => {

        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ mail: { ...this.state.mail, [field]: value } });
    };

    onSend = (ev = null, toDraft = false) => {
        debugger
        if (!this.state.mail.to || !this.state.mail.subject || !this.state.mail.body) return;
        if (ev) ev.preventDefault();
        toDraft ? this.props.onSaveDraft(this.state.mail) : this.props.onSendMail(this.state.mail);
    };

    render() {
        const { to, subject, body } = this.state
        return (
            <form className="mail-compose">
                <input
                    ref={this.inputRef}
                    type="email"
                    name="to"
                    value={to}
                    placeholder="To who?"
                    onChange={this.handleChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    value={subject}
                    placeholder="Enter subject"
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                />
                <textarea
                    name='body'
                    placeholder="Enter mail text here"
                    value={body}
                    rows="10"
                    minLength="1"
                    maxLength="420"
                    wrap="soft"
                    onChange={this.handleChange}
                    required
                >
                </textarea>


                <button onClick={this.onSend}>Send!</button>
                <button onClick={() => this.onSend(ev, true)}>To Draft</button>
            </form>

        );
    }
}
