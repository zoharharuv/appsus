export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: ''
        }
    }

    mailState
    interval
    inputRef = React.createRef()

    componentDidMount() {
        
        this.inputRef.current.focus();
        this.mailState = this.state.mail
        this.interval = setInterval(() => {
            this.mailState = this.state.mail
            console.log('saved draft state:', this.mailState);
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.mailState = this.state.mail
        console.log('out and: ', this.mailState);
        if (this.mailState.body) this.props.onSaveDraft(this.mailState)
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ mail: { ...this.state.mail, [field]: value } });
    };

    onSend = (ev = null, toDraft = false) => {
        if (!this.state.mail.to || !this.state.mail.to.includes('@') || !this.state.mail.subject || !this.state.mail.body) return;
        if (ev) ev.preventDefault();
        this.props.onSendMail(this.state.mail);
        this.setState({...mail, body: ''});
        // toDraft ? this.props.onSaveDraft(this.state.mail) : this.props.onSendMail(this.state.mail);
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

                <div className="mail-compose-btns">
                    <button className="compose-send-btn" onClick={this.onSend}>Send mail <img src="../../../../img/send-icon.svg" /></button>
                </div>
            </form>

        );
    }
}
